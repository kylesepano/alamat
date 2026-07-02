<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\LocationResource;
use App\Http\Resources\WorldLookupResource;
use App\Models\FastTravelPoint;
use App\Models\Location;
use App\Models\Province;
use App\Models\WorldEvent;
use App\Models\WorldRegion;
use App\Models\WorldRoute;
use App\Services\WorldService;
use Illuminate\Http\Request;

class WorldController extends Controller
{
    public function __construct(private readonly WorldService $world)
    {
    }

    public function regions()
    {
        return WorldLookupResource::collection(WorldRegion::query()->with('provinces')->where('is_active', true)->orderBy('name')->get());
    }

    public function provinces()
    {
        return WorldLookupResource::collection(Province::query()->with('region')->where('is_active', true)->orderBy('name')->get());
    }

    public function locations(Request $request)
    {
        return LocationResource::collection($this->world->query($request)->orderBy('name')->paginate((int) $request->query('per_page', 24)));
    }

    public function show(string $locationId): LocationResource
    {
        return LocationResource::make(Location::query()->with(WorldService::WITH)->where('location_id', $locationId)->firstOrFail());
    }

    public function showBySlug(string $slug): LocationResource
    {
        return LocationResource::make(Location::query()->with(WorldService::WITH)->where('slug', $slug)->firstOrFail());
    }

    public function type(string $type, Request $request)
    {
        $request->merge(['type' => $type]);
        return $this->locations($request);
    }

    public function routes()
    {
        return WorldLookupResource::collection(WorldRoute::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function spawns(string $locationId): FoundationCollectionResource
    {
        $location = Location::query()->with('spawnZones')->where('location_id', $locationId)->orWhere('slug', $locationId)->firstOrFail();
        return new FoundationCollectionResource($location->spawnZones);
    }

    public function npcs(string $locationId): FoundationCollectionResource
    {
        $location = Location::query()->with('npcPlacements')->where('location_id', $locationId)->orWhere('slug', $locationId)->firstOrFail();
        return new FoundationCollectionResource($location->npcPlacements);
    }

    public function fastTravel()
    {
        return WorldLookupResource::collection(FastTravelPoint::query()->with('location')->where('is_active', true)->orderBy('name')->get());
    }

    public function events()
    {
        return WorldLookupResource::collection(WorldEvent::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'regions' => WorldRegion::query()->count(),
            'provinces' => Province::query()->count(),
            'locations' => Location::query()->count(),
            'dungeons' => Location::query()->where('is_dungeon', true)->count(),
            'fast_travel' => FastTravelPoint::query()->count(),
            'events' => WorldEvent::query()->count(),
            'asset_ready' => Location::query()->whereHas('assetPrompts')->count(),
            'by_type' => Location::query()->selectRaw('location_type, count(*) as total')->groupBy('location_type')->orderBy('location_type')->pluck('total', 'location_type'),
        ]);
    }
}
