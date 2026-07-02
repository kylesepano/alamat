<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    protected $guarded = [];
    protected $casts = ['is_active' => 'boolean'];
    public function region(): BelongsTo { return $this->belongsTo(WorldRegion::class, 'region_id'); }
    public function locations(): HasMany { return $this->hasMany(Location::class, 'province_id'); }
}
