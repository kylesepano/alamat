<?php

namespace App\Services;

use App\Models\Quest;

class QuestRewardService
{
    public function preview(Quest $quest): array
    {
        return $quest->loadMissing('rewards')->rewards->toArray();
    }
}
