<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LoreBook extends Model
{
    protected $guarded = [];
    protected $casts = ['unlock_condition_payload' => 'array'];

    public function region(): BelongsTo { return $this->belongsTo(WorldRegion::class, 'region_id'); }
    public function location(): BelongsTo { return $this->belongsTo(Location::class, 'location_id'); }
}
