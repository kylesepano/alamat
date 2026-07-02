<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'location_id' => $this->location_id,
            'slug' => $this->slug,
            'name' => $this->name,
            'location_type' => $this->location_type,
            'region' => WorldLookupResource::make($this->whenLoaded('region')),
            'province' => WorldLookupResource::make($this->whenLoaded('province')),
            'parent_location' => WorldLookupResource::make($this->whenLoaded('parentLocation')),
            'description' => $this->description,
            'lore' => $this->lore,
            'levels' => ['min' => $this->recommended_level_min, 'max' => $this->recommended_level_max],
            'danger_level' => $this->danger_level,
            'default_weather' => $this->default_weather,
            'default_terrain' => $this->default_terrain,
            'available_times' => $this->available_times,
            'connected_locations' => $this->connected_locations,
            'assets' => ['map_filename' => $this->map_filename, 'preview_image' => $this->preview_image, 'asset_prompt' => $this->asset_prompt],
            'flags' => ['safe_zone' => $this->is_safe_zone, 'dungeon' => $this->is_dungeon, 'hidden' => $this->is_hidden, 'fast_travel_enabled' => $this->is_fast_travel_enabled],
            'transitions' => WorldLookupResource::collection($this->whenLoaded('outgoingTransitions')),
            'spawn_zones' => WorldLookupResource::collection($this->whenLoaded('spawnZones')),
            'npc_placements' => WorldLookupResource::collection($this->whenLoaded('npcPlacements')),
            'fast_travel' => WorldLookupResource::make($this->whenLoaded('fastTravelPoint')),
            'weather_zone' => WorldLookupResource::make($this->whenLoaded('weatherZone')),
            'quest_markers' => WorldLookupResource::collection($this->whenLoaded('questMarkers')),
            'events' => WorldLookupResource::collection($this->whenLoaded('events')),
            'asset_prompts' => WorldLookupResource::make($this->whenLoaded('assetPrompts')),
            'dungeon' => WorldLookupResource::make($this->whenLoaded('dungeon')),
        ];
    }
}
