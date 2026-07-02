<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FastTravelPoint extends Model
{
    protected $guarded = [];
    protected $casts = ['unlock_condition_payload' => 'array', 'cost_payload' => 'array', 'is_active' => 'boolean'];
    public function location(): BelongsTo { return $this->belongsTo(Location::class, 'location_id'); }
}
