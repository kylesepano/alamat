<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorldQuestMarker extends Model
{
    protected $guarded = [];
    protected $casts = ['coordinates_payload' => 'array', 'condition_payload' => 'array'];
}
