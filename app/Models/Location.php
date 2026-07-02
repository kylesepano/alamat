<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Location extends Model
{
    protected $guarded = [];
    protected $casts = ['available_times' => 'array', 'connected_locations' => 'array', 'is_safe_zone' => 'boolean', 'is_dungeon' => 'boolean', 'is_hidden' => 'boolean', 'is_fast_travel_enabled' => 'boolean', 'is_active' => 'boolean'];
    public function region(): BelongsTo { return $this->belongsTo(WorldRegion::class, 'region_id'); }
    public function province(): BelongsTo { return $this->belongsTo(Province::class, 'province_id'); }
    public function parentLocation(): BelongsTo { return $this->belongsTo(Location::class, 'parent_location_id'); }
    public function outgoingTransitions(): HasMany { return $this->hasMany(MapTransition::class, 'from_location_id'); }
    public function incomingTransitions(): HasMany { return $this->hasMany(MapTransition::class, 'to_location_id'); }
    public function spawnZones(): HasMany { return $this->hasMany(SpawnZone::class, 'location_id'); }
    public function npcPlacements(): HasMany { return $this->hasMany(NPCPlacement::class, 'location_id'); }
    public function fastTravelPoint(): HasOne { return $this->hasOne(FastTravelPoint::class, 'location_id'); }
    public function weatherZone(): HasOne { return $this->hasOne(WeatherZone::class, 'location_id'); }
    public function questMarkers(): HasMany { return $this->hasMany(WorldQuestMarker::class, 'location_id'); }
    public function events(): HasMany { return $this->hasMany(WorldEvent::class, 'location_id'); }
    public function assetPrompts(): HasOne { return $this->hasOne(MapAssetPrompt::class, 'location_id'); }
    public function dungeon(): HasOne { return $this->hasOne(Dungeon::class, 'location_id'); }
}
