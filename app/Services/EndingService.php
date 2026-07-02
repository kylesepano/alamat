<?php

namespace App\Services;

use App\Models\EndingRoute;

class EndingService
{
    public function routes()
    {
        return EndingRoute::query()->with('epilogues')->orderBy('sort_order')->get();
    }
}
