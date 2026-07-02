<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcTraining extends Model
{
    protected $table = 'npc_training';
    protected $guarded = [];
    protected $casts = ['teaches_payload' => 'array', 'requirements_payload' => 'array', 'cost_payload' => 'array', 'is_active' => 'boolean'];
}
