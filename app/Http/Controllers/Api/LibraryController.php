<?php

namespace App\Http\Controllers\Api;

use App\Data\LibraryData;
use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Services\LibraryService;

class LibraryController extends Controller
{
    public function __construct(private readonly LibraryService $libraries)
    {
    }

    public function index(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->all());
    }

    public function show(string $library): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get($this->resolveLibrary($library)));
    }

    public function affiliations(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('affiliations'));
    }

    public function combatClasses(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('combat_classes'));
    }

    public function nilalangOrders(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('nilalang_orders'));
    }

    public function personalityTraits(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('personality_traits'));
    }

    public function aiBehaviors(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('ai_behaviors'));
    }

    public function temperaments(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('temperaments'));
    }

    public function statusEffects(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('status_effects'));
    }

    public function trustMethods(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('trust_methods'));
    }

    public function habitats(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('habitats'));
    }

    public function weatherTypes(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('weather_types'));
    }

    public function activeTimes(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('active_times'));
    }

    public function rarityTiers(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('rarity_tiers'));
    }

    public function growthRanks(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('growth_ranks'));
    }

    public function equipmentCategories(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('equipment_categories'));
    }

    public function itemCategories(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('item_categories'));
    }

    public function skillCategories(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('skill_categories'));
    }

    public function targetTypes(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('target_types'));
    }

    public function damageTypes(): FoundationCollectionResource
    {
        return new FoundationCollectionResource($this->libraries->get('damage_types'));
    }

    private function resolveLibrary(string $library): string
    {
        $map = LibraryData::endpointMap();

        abort_unless(isset($map[$library]), 404, "Unknown library [{$library}].");

        return $map[$library];
    }
}
