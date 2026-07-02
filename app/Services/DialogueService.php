<?php

namespace App\Services;

use App\Models\Npc;
use App\Models\StoryDialogue;

class DialogueService
{
    public function tree(Npc $npc): ?array
    {
        $dialogue = $npc->loadMissing('dialogue.conditions')->dialogue;
        return $dialogue?->toArray();
    }

    public function storyNode(string $dialogueId): ?array
    {
        return StoryDialogue::query()
            ->with(['scene.chapter.act', 'choices'])
            ->where('dialogue_id', $dialogueId)
            ->first()
            ?->toArray();
    }
}
