<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorldRegion extends Model
{
    protected $guarded = [];
    protected $casts = ['is_active' => 'boolean'];
    public function provinces(): HasMany { return $this->hasMany(Province::class, 'region_id'); }
    public function locations(): HasMany { return $this->hasMany(Location::class, 'region_id'); }
}
