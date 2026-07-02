<?php

namespace App\Services;

use App\Models\Npc;

class TrainerService
{
    public function lessons(Npc $npc): array
    {
        return $npc->loadMissing('training')->training->toArray();
    }
}
