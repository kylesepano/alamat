<?php

namespace App\Services;

use App\Models\Location;

class MapAssetPromptService { public function forLocation(Location $location): ?array { return $location->loadMissing('assetPrompts')->assetPrompts?->toArray(); } }
