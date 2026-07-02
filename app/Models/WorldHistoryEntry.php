<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorldHistoryEntry extends Model
{
    protected $guarded = [];

    public function timeline(): BelongsTo { return $this->belongsTo(TimelineEntry::class, 'related_timeline_id'); }
}
