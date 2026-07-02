<?php

namespace App\Services;

use App\Models\Quest;

class QuestMarkerService
{
    public function markers(Quest $quest): array
    {
        return $quest->loadMissing('markers')->markers->toArray();
    }
}
