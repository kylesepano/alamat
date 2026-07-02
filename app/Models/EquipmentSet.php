<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class EquipmentSet extends Model
{
    protected $guarded = [];

    protected $casts = [
        'set_bonus_payload' => 'array',
        'is_active' => 'boolean',
    ];

    public function equipment(): BelongsToMany
    {
        return $this->belongsToMany(Equipment::class, 'equipment_set_items', 'set_id', 'equipment_id');
    }
}
