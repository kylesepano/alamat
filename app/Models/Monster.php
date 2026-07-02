<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Monster extends Model
{
    protected $guarded = [];

    protected $casts = [
        'hp' => 'integer',
        'attack' => 'integer',
        'magic' => 'integer',
        'defense' => 'integer',
        'spirit_defense' => 'integer',
        'speed' => 'integer',
        'luck' => 'integer',
        'faith' => 'integer',
        'is_recruitable' => 'boolean',
        'is_boss' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function affiliations(): BelongsToMany
    {
        return $this->belongsToMany(LibraryAffiliation::class, 'monster_affiliation', 'monster_id', 'affiliation_id');
    }

    public function rarity(): BelongsTo
    {
        return $this->belongsTo(LibraryRarityTier::class, 'rarity_id');
    }

    public function nilalangOrder(): BelongsTo
    {
        return $this->belongsTo(LibraryNilalangOrder::class, 'nilalang_order_id');
    }

    public function combatClass(): BelongsTo
    {
        return $this->belongsTo(LibraryCombatClass::class, 'combat_class_id');
    }

    public function temperament(): BelongsTo
    {
        return $this->belongsTo(LibraryTemperament::class, 'temperament_id');
    }

    public function aiBehavior(): BelongsTo
    {
        return $this->belongsTo(LibraryAiBehavior::class, 'ai_behavior_id');
    }

    public function personalityTraits(): BelongsToMany
    {
        return $this->belongsToMany(LibraryPersonalityTrait::class, 'monster_personality_trait', 'monster_id', 'personality_trait_id');
    }

    public function habitats(): BelongsToMany
    {
        return $this->belongsToMany(LibraryHabitat::class, 'monster_habitat', 'monster_id', 'habitat_id');
    }

    public function weatherTypes(): BelongsToMany
    {
        return $this->belongsToMany(LibraryWeatherType::class, 'monster_weather_type', 'monster_id', 'weather_type_id');
    }

    public function activeTimes(): BelongsToMany
    {
        return $this->belongsToMany(LibraryActiveTime::class, 'monster_active_time', 'monster_id', 'active_time_id');
    }

    public function trustMethod(): BelongsTo
    {
        return $this->belongsTo(LibraryTrustMethod::class, 'trust_method_id');
    }

    public function uniqueSkills(): HasMany
    {
        return $this->hasMany(MonsterUniqueSkill::class)->orderBy('sort_order');
    }

    public function commonSkills(): HasMany
    {
        return $this->hasMany(MonsterCommonSkillLink::class);
    }

    public function dropTables(): HasMany
    {
        return $this->hasMany(MonsterDropTable::class);
    }
}
