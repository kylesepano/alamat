<?php

namespace App\Repositories;

use App\Models\LibraryActiveTime;
use App\Models\LibraryAffiliation;
use App\Models\LibraryAiBehavior;
use App\Models\LibraryCombatClass;
use App\Models\LibraryDamageType;
use App\Models\LibraryEquipmentCategory;
use App\Models\LibraryGrowthRank;
use App\Models\LibraryHabitat;
use App\Models\LibraryItemCategory;
use App\Models\LibraryNilalangOrder;
use App\Models\LibraryPersonalityTrait;
use App\Models\LibraryRarityTier;
use App\Models\LibrarySkillCategory;
use App\Models\LibraryStatusEffect;
use App\Models\LibraryTargetType;
use App\Models\LibraryTemperament;
use App\Models\LibraryTrustMethod;
use App\Models\LibraryWeatherType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class LibraryRepository
{
    public const MODELS = [
        'affiliations' => LibraryAffiliation::class,
        'combat_classes' => LibraryCombatClass::class,
        'nilalang_orders' => LibraryNilalangOrder::class,
        'personality_traits' => LibraryPersonalityTrait::class,
        'ai_behaviors' => LibraryAiBehavior::class,
        'temperaments' => LibraryTemperament::class,
        'status_effects' => LibraryStatusEffect::class,
        'trust_methods' => LibraryTrustMethod::class,
        'habitats' => LibraryHabitat::class,
        'weather_types' => LibraryWeatherType::class,
        'active_times' => LibraryActiveTime::class,
        'rarity_tiers' => LibraryRarityTier::class,
        'growth_ranks' => LibraryGrowthRank::class,
        'equipment_categories' => LibraryEquipmentCategory::class,
        'item_categories' => LibraryItemCategory::class,
        'skill_categories' => LibrarySkillCategory::class,
        'target_types' => LibraryTargetType::class,
        'damage_types' => LibraryDamageType::class,
    ];

    public function keys(): array
    {
        return array_keys(self::MODELS);
    }

    public function all(string $library): Collection
    {
        return $this->model($library)::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
    }

    public function find(string $library, int|string $value, string $field = 'id'): ?Model
    {
        return $this->model($library)::query()->where($field, $value)->first();
    }

    public function model(string $library): string
    {
        abort_unless(isset(self::MODELS[$library]), 404, "Unknown library [{$library}].");

        return self::MODELS[$library];
    }
}
