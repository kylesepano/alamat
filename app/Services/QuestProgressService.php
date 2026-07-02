<?php

namespace App\Services;

use App\Models\Quest;
use App\Models\QuestPlayerProgress;
use Illuminate\Support\Carbon;

class QuestProgressService
{
    public function start(Quest $quest, string $playerKey = 'local-dev'): QuestPlayerProgress
    {
        return QuestPlayerProgress::query()->updateOrCreate(['player_key' => $playerKey, 'quest_id' => $quest->id], ['status' => 'active', 'current_step_order' => 1, 'started_at' => now(), 'progress_payload' => ['started_from_api' => true]]);
    }

    public function advance(Quest $quest, string $playerKey = 'local-dev'): QuestPlayerProgress
    {
        $progress = $this->start($quest, $playerKey);
        $progress->increment('current_step_order');
        return $progress->refresh();
    }

    public function complete(Quest $quest, string $playerKey = 'local-dev'): QuestPlayerProgress
    {
        $progress = $this->start($quest, $playerKey);
        $progress->fill(['status' => 'completed', 'completed_at' => Carbon::now()])->save();
        return $progress->refresh();
    }

    public function chooseBranch(Quest $quest, string $branchId, string $playerKey = 'local-dev'): QuestPlayerProgress
    {
        $progress = $this->start($quest, $playerKey);
        $branches = $progress->chosen_branches ?? [];
        $branches[] = $branchId;
        $progress->fill(['chosen_branches' => array_values(array_unique($branches))])->save();
        return $progress->refresh();
    }
}
