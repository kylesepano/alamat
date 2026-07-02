<?php

namespace App\Http\Controllers\Api;

use App\Data\GameFoundationData;
use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;

class GameFoundationController extends Controller
{
    public function ages(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::ages());
    }

    public function realms(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::realms());
    }

    public function nilalangOrders(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::nilalangOrders());
    }

    public function affiliations(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::affiliations());
    }

    public function combatClasses(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::combatClasses());
    }

    public function trustMethods(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::trustMethods());
    }

    public function growthSystem(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::growthSystem());
    }

    public function foundation(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(GameFoundationData::all());
    }
}
