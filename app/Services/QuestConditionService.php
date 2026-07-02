<?php

namespace App\Services;

use App\Models\Quest;

class QuestConditionService
{
    public function isAvailable(Quest $quest, array $context = []): bool
    {
        $level = $context['player_level'] ?? 999;
        $chapter = $context['story_chapter'] ?? 999;
        return ($quest->required_level ?? 0) <= $level && ($quest->required_story_chapter ?? 0) <= $chapter;
    }
}
