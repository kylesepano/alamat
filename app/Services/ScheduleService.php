<?php

namespace App\Services;

use App\Models\Npc;

class ScheduleService
{
    public function schedule(Npc $npc): ?array
    {
        return $npc->loadMissing('schedule')->schedule?->toArray();
    }
}
