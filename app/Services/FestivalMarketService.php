<?php

namespace App\Services;

use App\Models\FestivalMarket;

class FestivalMarketService
{
    public function all(): array
    {
        return FestivalMarket::query()->where('is_active', true)->orderBy('name')->get()->toArray();
    }
}
