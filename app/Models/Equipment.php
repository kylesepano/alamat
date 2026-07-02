<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Equipment extends Model
{
    protected $table = 'equipment';

    protected $guarded = [];

    protected $casts = [
        'effect_payload' => 'array',
        'compatibility_payload' => 'array',
        'usable_by_player' => 'boolean',
        'usable_by_monsters' => 'boolean',
        'usable_by_npcs' => 'boolean',
        'stackable' => 'boolean',
        'sellable' => 'boolean',
        'buyable' => 'boolean',
        'is_active' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(EquipmentCategory::class, 'category_id');
    }

    public function rarity(): BelongsTo
    {
        return $this->belongsTo(LibraryRarityTier::class, 'rarity_id');
    }

    public function requiredMonster(): BelongsTo
    {
        return $this->belongsTo(Monster::class, 'required_monster_id');
    }

    public function statusEffect(): BelongsTo
    {
        return $this->belongsTo(LibraryStatusEffect::class, 'status_effect_id');
    }

    public function upgradePaths(): HasMany
    {
        return $this->hasMany(EquipmentUpgradePath::class, 'base_equipment_id');
    }

    public function sets(): BelongsToMany
    {
        return $this->belongsToMany(EquipmentSet::class, 'equipment_set_items', 'equipment_id', 'set_id');
    }
}
