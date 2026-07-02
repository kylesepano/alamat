<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcInventory extends Model
{
    protected $table = 'npc_inventory';
    protected $guarded = [];
    protected $casts = ['refresh_rule' => 'array', 'is_active' => 'boolean'];
}
