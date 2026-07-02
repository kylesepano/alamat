<?php

namespace App\Services;

use App\Models\Quest;

class QuestFlagService
{
    public function flags(Quest $quest): array
    {
        return $quest->loadMissing('flags')->flags->toArray();
    }
}
