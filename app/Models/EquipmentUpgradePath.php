<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentUpgradePath extends Model
{
    protected $guarded = [];

    protected $casts = [
        'required_items' => 'array',
        'success_rate' => 'decimal:2',
    ];

    public function baseEquipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'base_equipment_id');
    }

    public function upgradedEquipment(): BelongsTo
    {
        return $this->belongsTo(Equipment::class, 'upgraded_equipment_id');
    }
}
