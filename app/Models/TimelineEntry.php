<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TimelineEntry extends Model
{
    protected $guarded = [];
    protected $casts = ['participating_factions' => 'array', 'participating_monsters' => 'array', 'lasting_consequences' => 'array'];

    public function events(): HasMany { return $this->hasMany(HistoricalEvent::class, 'timeline_id'); }
}
