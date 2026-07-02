<?php

namespace App\Services;

use App\Models\Quest;

class QuestBranchService
{
    public function branches(Quest $quest): array
    {
        return $quest->loadMissing('branches')->branches->toArray();
    }
}
