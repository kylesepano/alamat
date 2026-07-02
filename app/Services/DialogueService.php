<?php

namespace App\Services;

use App\Models\Npc;

class DialogueService
{
    public function tree(Npc $npc): ?array
    {
        $dialogue = $npc->loadMissing('dialogue.conditions')->dialogue;
        return $dialogue?->toArray();
    }
}
