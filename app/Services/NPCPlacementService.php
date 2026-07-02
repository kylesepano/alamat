<?php

namespace App\Services;

use App\Models\Location;

class NPCPlacementService { public function forLocation(Location $location): array { return $location->loadMissing('npcPlacements')->npcPlacements->toArray(); } }
