<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WeatherZone extends Model
{
    protected $guarded = [];
    protected $casts = ['weather_table' => 'array', 'season_payload' => 'array', 'is_active' => 'boolean'];
}
