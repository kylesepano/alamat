<?php

namespace App\Services;

use App\Models\Location;

class SpawnZoneService { public function forLocation(Location $location): array { return $location->loadMissing('spawnZones')->spawnZones->toArray(); } }
