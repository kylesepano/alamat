<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Models\EquipmentSet;
use App\Models\EquipmentUpgradePath;
use App\Models\LibraryRarityTier;
use App\Models\LibraryStatusEffect;
use App\Models\Monster;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class EquipmentImportService
{
    public const DATA_ROOT = 'database/data/equipment';

    public const SLOTS = ['main_hand', 'off_hand', 'two_hand', 'head', 'body', 'feet', 'accessory', 'talisman', 'relic', 'instrument', 'charm', 'monster_core'];

    public function __construct(private readonly EquipmentAssetPromptService $assets)
    {
    }

    public function import(?string $file = null, bool $dryRun = false, bool $generatePrompts = true): array
    {
        $summary = ['categories' => 0, 'equipment_imported' => 0, 'equipment_updated' => 0, 'upgrades_imported' => 0, 'upgrades_updated' => 0, 'sets_imported' => 0, 'sets_updated' => 0, 'set_items' => 0, 'errors' => [], 'dry_run' => $dryRun];

        DB::beginTransaction();
        try {
            $summary['categories'] = $this->importCategories();
            $rows = $this->readJson(base_path(self::DATA_ROOT.'/'.($file ?: 'equipment.json')));

            foreach ($rows as $index => $row) {
                try {
                    $this->validateEquipment($row);
                    $model = Equipment::query()->updateOrCreate(['equipment_id' => $row['equipment_id']], $this->payload($row, $generatePrompts));
                    $model->wasRecentlyCreated ? $summary['equipment_imported']++ : $summary['equipment_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $index + 1, 'equipment_id' => $row['equipment_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            $this->importUpgrades($summary);
            $this->importSets($summary);
            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    public function export(): array
    {
        return Equipment::query()->with(['category', 'rarity', 'sets'])->orderBy('equipment_id')->get()->toArray();
    }

    private function importCategories(): int
    {
        $categories = $this->readJson(base_path(self::DATA_ROOT.'/equipment_categories.json'));
        foreach ($categories as $category) {
            EquipmentCategory::query()->updateOrCreate(['category_id' => $category['category_id']], $category);
        }

        return count($categories);
    }

    private function importUpgrades(array &$summary): void
    {
        foreach ($this->readJson(base_path(self::DATA_ROOT.'/equipment_upgrade_paths.json')) as $row) {
            $base = Equipment::query()->where('equipment_id', $row['base_equipment_id'])->first();
            $upgraded = Equipment::query()->where('equipment_id', $row['upgraded_equipment_id'])->first();
            if (! $base || ! $upgraded) {
                continue;
            }

            $model = EquipmentUpgradePath::query()->updateOrCreate(
                ['upgrade_id' => $row['upgrade_id']],
                [
                    'base_equipment_id' => $base->id,
                    'upgraded_equipment_id' => $upgraded->id,
                    'upgrade_level' => $row['upgrade_level'],
                    'required_items' => $row['required_items'],
                    'required_gold' => $row['required_gold'],
                    'required_npc_id' => $row['required_npc_id'] ?? null,
                    'required_station' => $row['required_station'] ?? null,
                    'required_quest_id' => $row['required_quest_id'] ?? null,
                    'success_rate' => $row['success_rate'],
                    'description' => $row['description'],
                ],
            );
            $model->wasRecentlyCreated ? $summary['upgrades_imported']++ : $summary['upgrades_updated']++;
        }
    }

    private function importSets(array &$summary): void
    {
        $setModels = [];
        foreach ($this->readJson(base_path(self::DATA_ROOT.'/equipment_sets.json')) as $row) {
            $set = EquipmentSet::query()->updateOrCreate(['set_id' => $row['set_id']], $row);
            $set->wasRecentlyCreated ? $summary['sets_imported']++ : $summary['sets_updated']++;
            $setModels[$set->set_id] = $set;
        }

        foreach ($this->readJson(base_path(self::DATA_ROOT.'/equipment_set_items.json')) as $row) {
            $set = $setModels[$row['set_id']] ?? null;
            $equipment = Equipment::query()->where('equipment_id', $row['equipment_id'])->first();
            if ($set && $equipment) {
                $set->equipment()->syncWithoutDetaching([$equipment->id]);
                $summary['set_items']++;
            }
        }
    }

    private function payload(array $row, bool $generatePrompts): array
    {
        $category = EquipmentCategory::query()->where('category_id', $row['category_id'])->orWhere('slug', $row['category_id'])->firstOrFail();
        $rarity = LibraryRarityTier::query()->where('code', $row['rarity'])->orWhere('slug', Str::slug($row['rarity']))->orWhere('name', $row['rarity'])->firstOrFail();
        $assetFields = $generatePrompts ? $this->assets->prompts($row) : [];

        return [
            ...collect($row)->except(['category_id', 'rarity', 'required_monster_id', 'status_effect_id'])->all(),
            'category_id' => $category->id,
            'rarity_id' => $rarity->id,
            'required_monster_id' => $this->resolveMonsterId($row['required_monster_id'] ?? null),
            'status_effect_id' => $this->resolveStatusEffectId($row['status_effect_id'] ?? null),
            'icon_filename' => $row['icon_filename'] ?? $assetFields['icon_filename'],
            'sprite_filename' => $row['sprite_filename'] ?? $assetFields['sprite_filename'],
            'thumbnail_filename' => $row['thumbnail_filename'] ?? $assetFields['thumbnail_filename'],
            'asset_prompt' => $row['asset_prompt'] ?? $assetFields['asset_prompt'],
            'icon_prompt' => $row['icon_prompt'] ?? $assetFields['icon_prompt'],
            'design_notes' => $row['design_notes'] ?? $assetFields['design_notes'],
        ];
    }

    private function validateEquipment(array $row): void
    {
        foreach (['equipment_id', 'name', 'slug', 'category_id', 'slot_type', 'rarity', 'description', 'icon_filename', 'asset_prompt', 'icon_prompt'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Equipment field [{$field}] is required."]);
            }
        }

        if (! in_array($row['slot_type'], self::SLOTS, true)) {
            throw ValidationException::withMessages(['slot_type' => "Unsupported equipment slot [{$row['slot_type']}]."]);
        }

        if (($row['category_id'] === 'EQC0001') && (($row['attack_bonus'] ?? 0) + ($row['magic_bonus'] ?? 0) <= 0)) {
            throw ValidationException::withMessages(['weapon' => 'Weapons require attack_bonus or magic_bonus.']);
        }

        if (($row['category_id'] === 'EQC0002') && (($row['defense_bonus'] ?? 0) + ($row['spirit_defense_bonus'] ?? 0) <= 0)) {
            throw ValidationException::withMessages(['armor' => 'Armor requires defense_bonus or spirit_defense_bonus.']);
        }

        if ($row['category_id'] === 'EQC0010' && ! ($row['usable_by_monsters'] ?? false)) {
            throw ValidationException::withMessages(['monster_gear' => 'Monster gear must be usable by monsters.']);
        }
    }

    private function resolveMonsterId(?string $value): ?int
    {
        return blank($value) ? null : Monster::query()->where('monster_id', $value)->value('id');
    }

    private function resolveStatusEffectId(?string $value): ?int
    {
        return blank($value) ? null : LibraryStatusEffect::query()->where('code', $value)->orWhere('slug', Str::slug($value))->orWhere('name', $value)->value('id');
    }

    private function readJson(string $path): array
    {
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("Equipment data file [{$path}] not found.");
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
