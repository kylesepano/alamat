<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcSchedule extends Model
{
    protected $guarded = [];
    protected $casts = ['morning' => 'array', 'afternoon' => 'array', 'evening' => 'array', 'night' => 'array', 'late_night' => 'array', 'festival_schedule' => 'array', 'emergency_schedule' => 'array', 'weather_schedule' => 'array', 'story_progress_schedule' => 'array', 'route_payload' => 'array', 'is_active' => 'boolean'];
}
