<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HistoricalEvent extends Model
{
    protected $guarded = [];
    protected $casts = ['participating_factions' => 'array', 'participating_monsters' => 'array', 'lasting_consequences' => 'array'];

    public function timeline(): BelongsTo { return $this->belongsTo(TimelineEntry::class, 'timeline_id'); }
}
