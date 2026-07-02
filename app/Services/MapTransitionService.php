<?php

namespace App\Services;

use App\Models\Location;

class MapTransitionService { public function forLocation(Location $location): array { return $location->loadMissing('outgoingTransitions')->outgoingTransitions->toArray(); } }
