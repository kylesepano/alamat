<?php

namespace App\Services;

use App\Models\TimelineEntry;

class TimelineService
{
    public function entries()
    {
        return TimelineEntry::query()->with('events')->orderBy('sequence_order')->get();
    }
}
