<?php

namespace App\Services;

use App\Models\RegionalPriceModifier;

class EconomyPricingService
{
    public function modifiers(): array
    {
        return RegionalPriceModifier::query()->orderBy('category')->get()->toArray();
    }
}
