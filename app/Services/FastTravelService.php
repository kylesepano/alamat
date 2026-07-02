<?php

namespace App\Services;

use App\Models\FastTravelPoint;

class FastTravelService { public function all(): array { return FastTravelPoint::query()->where('is_active', true)->with('location')->get()->toArray(); } }
