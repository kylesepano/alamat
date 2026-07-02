<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NPCPlacement extends Model
{
    protected $table = 'npc_placements';
    protected $guarded = [];
    protected $casts = ['schedule_payload' => 'array', 'coordinates_payload' => 'array', 'condition_payload' => 'array'];
}
