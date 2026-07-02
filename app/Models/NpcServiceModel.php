<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcServiceModel extends Model
{
    protected $table = 'npc_services';
    protected $guarded = [];
    protected $casts = ['opening_hours' => 'array', 'pricing_payload' => 'array', 'requirements_payload' => 'array', 'relationship_modifiers' => 'array', 'is_active' => 'boolean'];
}
