<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NpcShop extends Model
{
    protected $guarded = [];
    protected $casts = ['refresh_rule' => 'array', 'inventory_rule_payload' => 'array', 'is_active' => 'boolean'];

    public function inventory(): HasMany
    {
        return $this->hasMany(NpcInventory::class, 'shop_id');
    }
}
