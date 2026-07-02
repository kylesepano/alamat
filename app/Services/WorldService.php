<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class WorldService
{
    public const WITH = ['region', 'province', 'parentLocation', 'outgoingTransitions', 'spawnZones', 'npcPlacements', 'fastTravelPoint', 'weatherZone', 'questMarkers', 'events', 'assetPrompts', 'dungeon'];

    public function query(Request $request): Builder
    {
        return Location::query()
            ->with(self::WITH)
            ->where('is_active', true)
            ->when($request->query('search'), fn (Builder $query, string $search) => $query->where(fn (Builder $q) => $q->where('name', 'like', "%{$search}%")->orWhere('location_id', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%")))
            ->when($request->query('type'), fn (Builder $query, string $value) => $query->where('location_type', $value))
            ->when($request->query('region'), fn (Builder $query, string $value) => $query->whereHas('region', fn (Builder $q) => $q->where('region_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('province'), fn (Builder $query, string $value) => $query->whereHas('province', fn (Builder $q) => $q->where('province_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->boolean('dungeon'), fn (Builder $query) => $query->where('is_dungeon', true));
    }
}
