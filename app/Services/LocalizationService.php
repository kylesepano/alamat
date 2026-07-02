<?php

namespace App\Services;

use App\Models\StoryDialogue;

class LocalizationService
{
    public function keys(): array
    {
        return StoryDialogue::query()
            ->whereNotNull('locale_key')
            ->orderBy('locale_key')
            ->pluck('text', 'locale_key')
            ->all();
    }
}
