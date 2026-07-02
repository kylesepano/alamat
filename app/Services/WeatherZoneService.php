<?php

namespace App\Services;

use App\Models\Location;

class WeatherZoneService { public function forLocation(Location $location): ?array { return $location->loadMissing('weatherZone')->weatherZone?->toArray(); } }
