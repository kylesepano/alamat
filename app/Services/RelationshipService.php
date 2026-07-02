<?php

namespace App\Services;

use App\Models\NpcRelationshipLevel;

class RelationshipService
{
    public function levelForPoints(int $points): ?NpcRelationshipLevel
    {
        return NpcRelationshipLevel::query()->where('min_points', '<=', $points)->where('max_points', '>=', $points)->first();
    }
}
