<?php

namespace App\Services;

use App\Models\Monster;
use App\Models\MonsterCommonSkillLink;
use App\Models\MonsterUniqueSkill;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class MonsterImportService
{
    private array $skipped = [];
    private array $warnings = [];
    private array $errors = [];
    private array $summary = [];

    public function __construct(private readonly LibraryService $libraries)
    {
    }

    public function import(string $file, string $format = 'json', bool $dryRun = false): array
    {
        $this->skipped = [];
        $this->warnings = [];
        $this->errors = [];
        $started = microtime(true);
        $path = base_path("database/data/monsters/{$file}");

        if (! is_file($path)) {
            throw new \InvalidArgumentException("Import file [{$file}] not found in database/data/monsters.");
        }

        $source = $format === 'csv' ? ['monsters' => $this->readCsv($path)] : $this->readJson($path);
        $rows = $source['monsters'];
        $this->summary = [
            'imported_monsters' => 0,
            'updated_monsters' => 0,
            'imported_unique_skills' => 0,
            'updated_unique_skills' => 0,
            'imported_common_skills' => 0,
            'updated_common_skills' => 0,
        ];

        DB::beginTransaction();

        try {
            foreach ($rows as $index => $row) {
                try {
                    $this->importRow($row, $source, $index + 1);
                } catch (\Throwable $exception) {
                    $skip = [
                        'row' => $index + 1,
                        'monster_id' => $row['monster_id'] ?? null,
                        'reason' => $exception->getMessage(),
                    ];
                    $this->skipped[] = $skip;
                    $this->errors[] = $skip;
                }
            }

            if ($dryRun) {
                DB::rollBack();
            } else {
                DB::commit();
            }
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        $this->clearCaches();
        $elapsed = round(microtime(true) - $started, 3);

        $result = [
            'file' => $file,
            'format' => $format,
            'dry_run' => $dryRun,
            ...$this->summary,
            'skipped' => count($this->skipped),
            'warnings' => $this->warnings,
            'errors' => $this->errors,
            'elapsed_time' => $elapsed,
        ];

        Log::build([
            'driver' => 'single',
            'path' => storage_path('logs/monster_import.log'),
        ])->info('Monster import completed', $result);

        return $result;
    }

    private function importRow(array $row, array $source, int $rowNumber): void
    {
        unset($row['evolution_chain']);
        $this->validateRequired($row);

        if ($this->skipDuplicateMonster($row, $rowNumber)) {
            return;
        }

        $monster = Monster::query()->updateOrCreate(
            ['monster_id' => $row['monster_id']],
            $this->monsterPayload($row),
        );

        if ($monster->wasRecentlyCreated) {
            $this->summary['imported_monsters']++;
        } else {
            $this->summary['updated_monsters']++;
        }

        $this->syncLibraries($monster, $row);
        $this->syncUniqueSkills($monster, $row, $source['monster_unique_skills'] ?? null);
        $this->syncCommonSkills($monster, $row, $source['monster_common_skill_links'] ?? null);
    }

    private function skipDuplicateMonster(array $row, int $rowNumber): bool
    {
        $slug = Str::slug($row['slug'] ?? $row['filipino_name']);
        $duplicate = Monster::query()
            ->where('monster_id', '!=', $row['monster_id'])
            ->where(function ($query) use ($row, $slug): void {
                $query
                    ->whereRaw('lower(filipino_name) = ?', [Str::lower($row['filipino_name'])])
                    ->orWhere('slug', $slug);
            })
            ->first(['monster_id', 'filipino_name']);

        if (! $duplicate) {
            return false;
        }

        $this->skipped[] = [
            'row' => $rowNumber,
            'monster_id' => $row['monster_id'],
            'reason' => "Duplicate Nilalang [{$row['filipino_name']}] already exists as {$duplicate->monster_id}.",
        ];
        $this->warnings[] = "Skipped duplicate Nilalang [{$row['filipino_name']}] from {$row['monster_id']}; existing entry is {$duplicate->monster_id}.";

        return true;
    }

    private function clearCaches(): void
    {
        $this->libraries->clearCache();

        foreach (['monsters.index', 'monsters.search', 'monster-codex.summary'] as $key) {
            Cache::forget($key);
        }
    }

    private function importResultForCommand(array $result): array
    {
        return [
            'Imported Monsters' => $result['imported_monsters'],
            'Updated Monsters' => $result['updated_monsters'],
            'Imported Unique Skills' => $result['imported_unique_skills'],
            'Updated Unique Skills' => $result['updated_unique_skills'],
            'Imported Common Skills' => $result['imported_common_skills'],
            'Updated Common Skills' => $result['updated_common_skills'],
            'Skipped' => $result['skipped'],
            'Warnings' => count($result['warnings']),
            'Errors' => count($result['errors']),
            'Elapsed Time' => $result['elapsed_time'],
        ];
    }

    private function oldReturnShape(array $result): array
    {
        return [
            'imported' => $result['imported_monsters'] + $result['updated_monsters'],
            'skipped' => $this->skipped,
        ];
    }

    private function monsterPayload(array $row): array
    {
        return [
            'filipino_name' => $row['filipino_name'],
            'english_name' => $row['english_name'],
            'scientific_name' => $row['scientific_name'] ?? null,
            'nickname' => $row['nickname'] ?? null,
            'slug' => $row['slug'] ?? Str::slug($row['filipino_name']),
            'region_of_origin' => $row['region_of_origin'],
            'province_origin' => $row['province_origin'] ?? null,
            'ethnolinguistic_origin' => $row['ethnolinguistic_origin'] ?? null,
            'folklore_source_url' => $row['folklore_source_url'] ?? null,
            'mythological_category' => $row['mythological_category'],
            'rarity_id' => $this->resolveId('rarity_tiers', $row['rarity'] ?? null, true),
            'nilalang_order_id' => $this->resolveId('nilalang_orders', $row['order'] ?? $row['nilalang_order'] ?? $this->orderFromCategory($row['mythological_category'] ?? null), true),
            'combat_class_id' => $this->resolveId('combat_classes', $row['class'] ?? $row['combat_class'] ?? null, true),
            'temperament_id' => $this->resolveId('temperaments', $row['temperament'] ?? null),
            'ai_behavior_id' => $this->resolveId('ai_behaviors', $row['ai_behavior'] ?? null),
            'passive_ability' => $row['passive_ability'],
            'hp' => (int) ($row['hp'] ?? 0),
            'attack' => (int) ($row['attack'] ?? 0),
            'magic' => (int) ($row['magic'] ?? 0),
            'defense' => (int) ($row['defense'] ?? 0),
            'spirit_defense' => (int) ($row['spirit_defense'] ?? 0),
            'speed' => (int) ($row['speed'] ?? 0),
            'luck' => (int) ($row['luck'] ?? 0),
            'faith' => (int) ($row['faith'] ?? 0),
            'capture_difficulty' => (string) ($row['capture_difficulty'] ?? $row['trust_difficulty'] ?? '0'),
            'trust_method_id' => $this->resolveId('trust_methods', $row['trust_method'] ?? null),
            'favorite_food_offering' => $row['favorite_food_offering'] ?? null,
            'folklore_summary' => $row['folklore_summary'],
            'alamat_lore' => $row['alamat_lore'],
            'lore_and_backstory' => $row['lore_and_backstory'],
            'physical_description' => $row['physical_description'],
            'personality_summary' => $row['personality'] ?? $row['personality_summary'] ?? null,
            'weaknesses' => $row['weaknesses'] ?? null,
            'resistances' => $row['resistances'] ?? null,
            'npc_related' => $row['npc_related'] ?? null,
            'quest_appearances' => $row['quest_appearances'] ?? null,
            'boss_variant' => $row['boss_variant'] ?? null,
            'corrupted_variant' => $row['corrupted_variant'] ?? null,
            'divine_variant' => $row['divine_variant'] ?? null,
            'sprite_filename' => $row['sprite_filename'],
            'battle_portrait_filename' => $row['battle_portrait_filename'],
            'overworld_sprite_filename' => $row['overworld_sprite_filename'],
            'sound_effects' => $row['sound_effects'] ?? null,
            'cry_voice_description' => $row['cry_voice_description'] ?? null,
            'drop_items' => $row['drop_items'] ?? null,
            'equipment_compatibility' => $row['equipment_compatibility'] ?? null,
            'sprite_prompt' => $row['sprite_prompt'],
            'portrait_prompt' => $row['portrait_prompt'],
            'battle_animation_prompt' => $row['battle_animation_prompt'],
            'design_notes' => $row['design_notes'] ?? null,
            'is_recruitable' => filter_var($row['is_recruitable'] ?? true, FILTER_VALIDATE_BOOL),
            'is_boss' => filter_var($row['is_boss'] ?? false, FILTER_VALIDATE_BOOL),
            'is_active' => filter_var($row['is_active'] ?? true, FILTER_VALIDATE_BOOL),
        ];
    }

    private function syncLibraries(Monster $monster, array $row): void
    {
        $monster->affiliations()->sync($this->resolveMany('affiliations', $row['affiliation'] ?? $row['affiliations'] ?? null));
        $monster->personalityTraits()->sync($this->resolveMany('personality_traits', $row['personality_traits'] ?? $row['personality'] ?? null));
        $monster->habitats()->sync($this->resolveMany('habitats', $row['habitat'] ?? $row['habitats'] ?? null));
        $monster->weatherTypes()->sync($this->resolveMany('weather_types', $row['weather_preference'] ?? $row['weather_types'] ?? null));
        $monster->activeTimes()->sync($this->resolveMany('active_times', $row['active_time'] ?? $row['active_times'] ?? null));
    }

    private function syncUniqueSkills(Monster $monster, array $row, ?array $sourceSkills = null): void
    {
        $skills = $sourceSkills
            ? array_values(array_filter($sourceSkills, fn (array $skill): bool => ($skill['monster_id'] ?? null) === $monster->monster_id))
            : null;

        $skills = $skills ?: ($row['unique_skills'] ?? array_filter([
            $this->simpleSkill($row['unique_skill_1'] ?? null, 1),
            $this->simpleSkill($row['unique_skill_2'] ?? null, 2),
        ]));

        $slugs = [];

        foreach (array_slice($skills, 0, 2) as $index => $skill) {
            $payload = [
                'skill_name' => $skill['skill_name'] ?? $skill['name'],
                'skill_slug' => $skill['skill_slug'] ?? Str::slug($skill['skill_name'] ?? $skill['name']),
                'description' => $skill['description'] ?? 'Unique Nilalang skill.',
                'lore' => $skill['lore'] ?? 'A signature expression of this Nilalang bond.',
                'category_id' => $this->resolveId('skill_categories', $skill['category'] ?? null),
                'damage_type_id' => $this->resolveId('damage_types', $skill['damage_type'] ?? null),
                'target_type_id' => $this->resolveId('target_types', $skill['target_type'] ?? null),
                'power' => isset($skill['power']) ? (int) $skill['power'] : null,
                'accuracy' => isset($skill['accuracy']) ? (int) $skill['accuracy'] : null,
                'mana_cost' => isset($skill['mana_cost']) ? (int) $skill['mana_cost'] : null,
                'faith_cost' => isset($skill['faith_cost']) ? (int) $skill['faith_cost'] : null,
                'cooldown' => isset($skill['cooldown']) ? (int) $skill['cooldown'] : null,
                'status_effect_id' => $this->resolveId('status_effects', $skill['status_effect'] ?? null),
                'animation_prompt' => $skill['animation_prompt'] ?? null,
                'icon_prompt' => $skill['icon_prompt'] ?? null,
                'sound_effect' => $skill['sound_effect'] ?? null,
                'sort_order' => $skill['sort_order'] ?? $index + 1,
            ];

            $slugs[] = $payload['skill_slug'];
            $model = MonsterUniqueSkill::query()->updateOrCreate(
                ['monster_id' => $monster->id, 'skill_slug' => $payload['skill_slug']],
                $payload,
            );

            $model->wasRecentlyCreated
                ? $this->summary['imported_unique_skills']++
                : $this->summary['updated_unique_skills']++;
        }

        if (count($skills) !== 2) {
            $this->warnings[] = "{$monster->monster_id} has ".count($skills).' unique skill(s); expected exactly 2.';
        }

        MonsterUniqueSkill::query()->where('monster_id', $monster->id)->whereNotIn('skill_slug', $slugs)->delete();
    }

    private function syncCommonSkills(Monster $monster, array $row, ?array $sourceSkills = null): void
    {
        $skills = $sourceSkills
            ? array_values(array_filter($sourceSkills, fn (array $skill): bool => ($skill['monster_id'] ?? null) === $monster->monster_id))
            : null;

        $skills = $skills ?: ($row['common_skills'] ?? $this->split($row['learnable_common_skills'] ?? null));
        $slugs = [];

        foreach ($skills as $skill) {
            $payload = is_array($skill)
                ? $skill
                : ['skill_name' => $skill, 'skill_slug' => Str::slug($skill)];

            $payload = [
                'skill_name' => $payload['skill_name'] ?? $payload['name'],
                'skill_slug' => $payload['skill_slug'] ?? Str::slug($payload['skill_name'] ?? $payload['name']),
                'category_id' => $this->resolveId('skill_categories', $payload['category'] ?? null),
                'damage_type_id' => $this->resolveId('damage_types', $payload['damage_type'] ?? null),
                'unlock_level' => isset($payload['unlock_level']) ? (int) $payload['unlock_level'] : null,
                'notes' => $payload['notes'] ?? null,
            ];

            $slugs[] = $payload['skill_slug'];
            $model = MonsterCommonSkillLink::query()->updateOrCreate(
                ['monster_id' => $monster->id, 'skill_slug' => $payload['skill_slug']],
                $payload,
            );

            $model->wasRecentlyCreated
                ? $this->summary['imported_common_skills']++
                : $this->summary['updated_common_skills']++;
        }

        MonsterCommonSkillLink::query()->where('monster_id', $monster->id)->whereNotIn('skill_slug', $slugs)->delete();
    }

    private function validateRequired(array $row): void
    {
        $required = [
            'monster_id', 'filipino_name', 'english_name', 'region_of_origin', 'mythological_category',
            'rarity', 'passive_ability', 'folklore_summary', 'alamat_lore', 'lore_and_backstory',
            'physical_description', 'sprite_filename', 'battle_portrait_filename', 'overworld_sprite_filename',
            'sprite_prompt', 'portrait_prompt', 'battle_animation_prompt',
        ];

        foreach ($required as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => 'Field is required.']);
            }
        }
    }

    private function resolveId(string $library, mixed $value, bool $required = false): ?int
    {
        if (blank($value)) {
            if ($required) {
                throw ValidationException::withMessages([$library => 'Library reference is required.']);
            }

            return null;
        }

        foreach (['code', 'slug', 'name'] as $field) {
            $entry = $this->libraries->lookup($library, trim((string) $value), $field);
            if ($entry) {
                return $entry->id;
            }
        }

        if ($required) {
            throw ValidationException::withMessages([$library => "Unable to resolve [{$value}]."]);
        }

        $this->warnings[] = "Optional {$library} reference [{$value}] was not resolved.";

        return null;
    }

    private function resolveMany(string $library, mixed $value): array
    {
        return collect($this->split($value))
            ->map(fn (string $item): ?int => $this->resolveId($library, $item))
            ->filter()
            ->values()
            ->all();
    }

    private function split(mixed $value): array
    {
        if (is_array($value)) {
            return $value;
        }

        if (blank($value)) {
            return [];
        }

        return array_values(array_filter(array_map('trim', explode(',', (string) $value))));
    }

    private function orderFromCategory(?string $category): ?string
    {
        if (blank($category)) {
            return null;
        }

        return trim(explode('/', $category)[0]);
    }

    private function simpleSkill(?string $name, int $sortOrder): ?array
    {
        if (blank($name)) {
            return null;
        }

        return [
            'skill_name' => $name,
            'skill_slug' => Str::slug($name),
            'sort_order' => $sortOrder,
        ];
    }

    private function readJson(string $path): array
    {
        $payload = json_decode(file_get_contents($path), true, flags: JSON_THROW_ON_ERROR);

        if (array_is_list($payload)) {
            return ['monsters' => $payload];
        }

        return [
            'monsters' => $payload['monsters'] ?? [$payload],
            'monster_unique_skills' => $payload['monster_unique_skills'] ?? [],
            'monster_common_skill_links' => $payload['monster_common_skill_links'] ?? [],
        ];
    }

    private function readCsv(string $path): array
    {
        $handle = fopen($path, 'r');
        $headers = fgetcsv($handle);
        $rows = [];

        while (($data = fgetcsv($handle)) !== false) {
            $rows[] = array_combine($headers, $data);
        }

        fclose($handle);

        return $rows;
    }
}
