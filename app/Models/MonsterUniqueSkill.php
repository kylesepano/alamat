<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonsterUniqueSkill extends Model
{
    protected $guarded = [];

    protected $casts = [
        'power' => 'integer',
        'accuracy' => 'integer',
        'mana_cost' => 'integer',
        'faith_cost' => 'integer',
        'cooldown' => 'integer',
        'sort_order' => 'integer',
    ];

    public function monster(): BelongsTo
    {
        return $this->belongsTo(Monster::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(LibrarySkillCategory::class, 'category_id');
    }

    public function damageType(): BelongsTo
    {
        return $this->belongsTo(LibraryDamageType::class, 'damage_type_id');
    }

    public function targetType(): BelongsTo
    {
        return $this->belongsTo(LibraryTargetType::class, 'target_type_id');
    }

    public function statusEffect(): BelongsTo
    {
        return $this->belongsTo(LibraryStatusEffect::class, 'status_effect_id');
    }
}
