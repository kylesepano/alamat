<?php

namespace App\Services;

use App\Models\Dungeon;
use App\Models\FastTravelPoint;
use App\Models\Interior;
use App\Models\Item;
use App\Models\Location;
use App\Models\LocationType;
use App\Models\MapAssetPrompt;
use App\Models\MapTransition;
use App\Models\Monster;
use App\Models\NPCPlacement;
use App\Models\Npc;
use App\Models\Province;
use App\Models\Quest;
use App\Models\SpawnZone;
use App\Models\WeatherZone;
use App\Models\WorldEvent;
use App\Models\WorldQuestMarker;
use App\Models\WorldRegion;
use App\Models\WorldRoute;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class LocationImportService
{
    public const DATA_ROOT = 'database/data/world';

    public function import(bool $dryRun = false): array
    {
        $summary = ['regions' => 0, 'provinces' => 0, 'location_types' => 0, 'locations_imported' => 0, 'locations_updated' => 0, 'routes' => 0, 'interiors' => 0, 'dungeons' => 0, 'fast_travel' => 0, 'transitions' => 0, 'spawn_zones' => 0, 'weather_zones' => 0, 'npc_placements' => 0, 'quest_markers' => 0, 'world_events' => 0, 'asset_prompts' => 0, 'errors' => [], 'dry_run' => $dryRun];
        DB::beginTransaction();
        try {
            $summary['regions'] = $this->importRegions();
            $summary['provinces'] = $this->importProvinces();
            $summary['location_types'] = $this->lookupImport(LocationType::class, 'location_types.json', 'type_id');

            foreach ($this->read('locations.json') as $index => $row) {
                try {
                    $this->validateLocation($row);
                    $location = Location::query()->updateOrCreate(['location_id' => $row['location_id']], $this->locationPayload($row));
                    $location->wasRecentlyCreated ? $summary['locations_imported']++ : $summary['locations_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $index + 1, 'location_id' => $row['location_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            $summary['routes'] = $this->importRoutes();
            $summary['interiors'] = $this->importInteriors();
            $summary['dungeons'] = $this->importDungeons();
            $summary['fast_travel'] = $this->importLocationRows(FastTravelPoint::class, 'fast_travel_points.json', 'fast_travel_id');
            $summary['transitions'] = $this->importTransitions();
            $summary['spawn_zones'] = $this->importSpawnZones();
            $summary['weather_zones'] = $this->importLocationRows(WeatherZone::class, 'weather_zones.json', 'weather_zone_id');
            $summary['npc_placements'] = $this->importNpcPlacements();
            $summary['quest_markers'] = $this->importQuestMarkers();
            $summary['world_events'] = $this->importLocationRows(WorldEvent::class, 'world_events.json', 'world_event_id');
            $summary['asset_prompts'] = $this->importLocationRows(MapAssetPrompt::class, 'map_asset_prompts.json', 'map_asset_prompt_id');

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    private function importRegions(): int
    {
        $rows = $this->read('world_regions.json');
        foreach ($rows as $row) {
            WorldRegion::query()->updateOrCreate(['region_id' => $row['region_id']], $row);
        }
        return count($rows);
    }

    private function importProvinces(): int
    {
        $rows = $this->read('provinces.json');
        foreach ($rows as $row) {
            Province::query()->updateOrCreate(['province_id' => $row['province_id']], [...collect($row)->except(['region_id'])->all(), 'region_id' => $this->regionPk($row['region_id'])]);
        }
        return count($rows);
    }

    private function lookupImport(string $model, string $file, string $key): int
    {
        $rows = $this->read($file);
        foreach ($rows as $row) {
            $model::query()->updateOrCreate([$key => $row[$key]], $row);
        }
        return count($rows);
    }

    private function importLocationRows(string $model, string $file, string $key): int
    {
        $count = 0;
        foreach ($this->read($file) as $row) {
            $locationId = $this->locationPk($row['location_id'] ?? null);
            if (! $locationId) {
                continue;
            }
            $model::query()->updateOrCreate([$key => $row[$key]], [...collect($row)->except(['location_id'])->all(), 'location_id' => $locationId]);
            $count++;
        }
        return $count;
    }

    private function importRoutes(): int
    {
        $count = 0;
        foreach ($this->read('routes.json') as $row) {
            $from = $this->locationPk($row['from_location_id'] ?? null);
            $to = $this->locationPk($row['to_location_id'] ?? null);
            if (! $from || ! $to) {
                continue;
            }
            WorldRoute::query()->updateOrCreate(['route_id' => $row['route_id']], [...collect($row)->except(['from_location_id', 'to_location_id'])->all(), 'from_location_id' => $from, 'to_location_id' => $to]);
            $count++;
        }
        return $count;
    }

    private function importInteriors(): int
    {
        $count = 0;
        foreach ($this->read('interiors.json') as $row) {
            $parent = $this->locationPk($row['parent_location_id'] ?? null);
            if (! $parent) {
                continue;
            }
            Interior::query()->updateOrCreate(['interior_id' => $row['interior_id']], [...collect($row)->except(['parent_location_id'])->all(), 'parent_location_id' => $parent]);
            $count++;
        }
        return $count;
    }

    private function importDungeons(): int
    {
        $count = 0;
        foreach ($this->read('dungeons.json') as $row) {
            $location = $this->locationPk($row['location_id'] ?? null);
            if (! $location) {
                continue;
            }
            Dungeon::query()->updateOrCreate(['dungeon_id' => $row['dungeon_id']], [...collect($row)->except(['location_id', 'boss_monster_id'])->all(), 'location_id' => $location, 'boss_monster_id' => $this->monsterPk($row['boss_monster_id'] ?? null)]);
            $count++;
        }
        return $count;
    }

    private function importTransitions(): int
    {
        $count = 0;
        foreach ($this->read('map_transitions.json') as $row) {
            $this->validateTransition($row);
            $from = $this->locationPk($row['from_location_id'] ?? null);
            $to = $this->locationPk($row['to_location_id'] ?? null);
            if (! $from || ! $to) {
                continue;
            }
            MapTransition::query()->updateOrCreate(['transition_id' => $row['transition_id']], [
                ...collect($row)->except(['from_location_id', 'to_location_id', 'required_quest_id', 'required_item_id'])->all(),
                'from_location_id' => $from,
                'to_location_id' => $to,
                'required_quest_id' => $this->questPk($row['required_quest_id'] ?? null),
                'required_item_id' => $this->itemPk($row['required_item_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importSpawnZones(): int
    {
        $count = 0;
        foreach ($this->read('spawn_zones.json') as $row) {
            $this->validateSpawn($row);
            $location = $this->locationPk($row['location_id'] ?? null);
            $monster = $this->monsterPk($row['monster_id'] ?? null) ?? Monster::query()->orderBy('monster_id')->value('id');
            if (! $location || ! $monster) {
                continue;
            }
            SpawnZone::query()->updateOrCreate(['spawn_zone_id' => $row['spawn_zone_id']], [
                ...collect($row)->except(['location_id', 'monster_id', 'quest_requirement'])->all(),
                'location_id' => $location,
                'monster_id' => $monster,
                'quest_requirement' => $this->questPk($row['quest_requirement'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importNpcPlacements(): int
    {
        $count = 0;
        foreach ($this->read('npc_placements.json') as $row) {
            $this->validateNpcPlacement($row);
            $npc = $this->npcPk($row['npc_id'] ?? null);
            $location = $this->locationPk($row['location_id'] ?? null);
            if (! $npc || ! $location) {
                continue;
            }
            NPCPlacement::query()->updateOrCreate(['placement_id' => $row['placement_id']], [...collect($row)->except(['npc_id', 'location_id'])->all(), 'npc_id' => $npc, 'location_id' => $location]);
            $count++;
        }
        return $count;
    }

    private function importQuestMarkers(): int
    {
        $count = 0;
        foreach ($this->read('quest_markers.json') as $row) {
            $quest = $this->questPk($row['quest_id'] ?? null);
            $location = $this->locationPk($row['location_id'] ?? null);
            if (! $quest || ! $location) {
                continue;
            }
            WorldQuestMarker::query()->updateOrCreate(['world_quest_marker_id' => $row['world_quest_marker_id']], [...collect($row)->except(['quest_id', 'location_id'])->all(), 'quest_id' => $quest, 'location_id' => $location]);
            $count++;
        }
        return $count;
    }

    private function locationPayload(array $row): array
    {
        return [
            ...collect($row)->except(['region_id', 'province_id', 'parent_location_id'])->all(),
            'region_id' => $this->regionPk($row['region_id'] ?? null),
            'province_id' => $this->provincePk($row['province_id'] ?? null),
            'parent_location_id' => $this->locationPk($row['parent_location_id'] ?? null),
        ];
    }

    private function validateLocation(array $row): void
    {
        foreach (['location_id', 'slug', 'name', 'location_type', 'description'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Location field [{$field}] is required."]);
            }
        }
    }

    private function validateTransition(array $row): void
    {
        if (blank($row['from_location_id'] ?? null) || blank($row['to_location_id'] ?? null)) {
            throw ValidationException::withMessages(['transition' => 'Every transition requires from_location_id and to_location_id.']);
        }
    }

    private function validateSpawn(array $row): void
    {
        foreach (['location_id', 'monster_id', 'spawn_rate'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Spawn zone field [{$field}] is required."]);
            }
        }
    }

    private function validateNpcPlacement(array $row): void
    {
        if (blank($row['npc_id'] ?? null) || blank($row['location_id'] ?? null)) {
            throw ValidationException::withMessages(['npc_placement' => 'Every NPC placement requires npc_id and location_id.']);
        }
    }

    private function regionPk(?string $value): ?int { return blank($value) ? null : WorldRegion::query()->where('region_id', $value)->orWhere('slug', $value)->value('id'); }
    private function provincePk(?string $value): ?int { return blank($value) ? null : Province::query()->where('province_id', $value)->orWhere('slug', $value)->value('id'); }
    private function locationPk(?string $value): ?int { return blank($value) ? null : Location::query()->where('location_id', $value)->orWhere('slug', $value)->value('id'); }
    private function npcPk(?string $value): ?int { return blank($value) ? null : Npc::query()->where('npc_id', $value)->orWhere('slug', $value)->value('id'); }
    private function monsterPk(?string $value): ?int { return blank($value) ? null : Monster::query()->where('monster_id', $value)->orWhere('slug', $value)->value('id'); }
    private function questPk(?string $value): ?int { return blank($value) ? null : Quest::query()->where('quest_id', $value)->orWhere('slug', $value)->value('id'); }
    private function itemPk(?string $value): ?int { return blank($value) ? null : Item::query()->where('item_id', $value)->orWhere('slug', $value)->value('id'); }

    private function read(string $file): array
    {
        $path = base_path(self::DATA_ROOT.'/'.$file);
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("World data file [{$path}] not found.");
        }
        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
