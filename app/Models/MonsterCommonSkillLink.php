<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MonsterCommonSkillLink extends Model
{
    protected $guarded = [];

    protected $casts = [
        'unlock_level' => 'integer',
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
}
