<?php

namespace App\Services;

use App\Models\TradeRoute;

class TradeRouteService
{
    public function all(): array
    {
        return TradeRoute::query()->orderBy('route_id')->get()->toArray();
    }
}
