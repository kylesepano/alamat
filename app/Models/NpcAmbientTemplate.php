<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcAmbientTemplate extends Model
{
    protected $guarded = [];
    protected $casts = ['schedule_payload' => 'array', 'dialogue_pool' => 'array', 'spawn_rules' => 'array', 'is_active' => 'boolean'];
}
