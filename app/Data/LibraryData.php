<?php

namespace App\Data;

use Illuminate\Support\Facades\File;

class LibraryData
{
    public const SOURCE_PATH = 'database/data/alamat_phase_b_seed_data.json';

    public static function all(): array
    {
        return self::payload()['libraries'] ?? [];
    }

    public static function get(string $key): array
    {
        return self::all()[$key] ?? [];
    }

    public static function categories(): array
    {
        return [
            'battle' => ['combat_classes', 'ai_behaviors', 'status_effects', 'target_types', 'damage_types'],
            'world' => ['affiliations', 'habitats', 'weather_types', 'active_times'],
            'monster_design' => ['nilalang_orders', 'personality_traits', 'temperaments'],
            'items' => ['equipment_categories', 'item_categories'],
            'skills' => ['skill_categories', 'target_types', 'damage_types', 'status_effects'],
            'progression' => ['trust_methods', 'rarity_tiers', 'growth_ranks'],
        ];
    }

    public static function labels(): array
    {
        return [
            'affiliations' => 'Affiliations',
            'combat_classes' => 'Combat Classes',
            'nilalang_orders' => 'Nilalang Orders',
            'personality_traits' => 'Personality Traits',
            'ai_behaviors' => 'AI Behavior Profiles',
            'temperaments' => 'Temperaments',
            'status_effects' => 'Status Effects',
            'trust_methods' => 'Trust Methods',
            'habitats' => 'Habitats',
            'weather_types' => 'Weather Types',
            'active_times' => 'Active Times',
            'rarity_tiers' => 'Rarity Tiers',
            'growth_ranks' => 'Growth Ranks',
            'equipment_categories' => 'Equipment Categories',
            'item_categories' => 'Item Categories',
            'skill_categories' => 'Skill Categories',
            'target_types' => 'Target Types',
            'damage_types' => 'Damage Types',
        ];
    }

    public static function endpointMap(): array
    {
        return [
            'affiliations' => 'affiliations',
            'combat-classes' => 'combat_classes',
            'nilalang-orders' => 'nilalang_orders',
            'personality-traits' => 'personality_traits',
            'ai-behaviors' => 'ai_behaviors',
            'temperaments' => 'temperaments',
            'status-effects' => 'status_effects',
            'trust-methods' => 'trust_methods',
            'habitats' => 'habitats',
            'weather-types' => 'weather_types',
            'active-times' => 'active_times',
            'rarity-tiers' => 'rarity_tiers',
            'growth-ranks' => 'growth_ranks',
            'equipment-categories' => 'equipment_categories',
            'item-categories' => 'item_categories',
            'skill-categories' => 'skill_categories',
            'target-types' => 'target_types',
            'damage-types' => 'damage_types',
        ];
    }

    public static function payload(): array
    {
        $path = base_path(self::SOURCE_PATH);

        if (! File::exists($path)) {
            return ['libraries' => []];
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
