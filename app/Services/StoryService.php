<?php

namespace App\Services;

use App\Models\StoryAct;
use App\Models\StoryChapter;
use App\Models\StoryScene;

class StoryService
{
    public function acts()
    {
        return StoryAct::query()->with('chapters')->orderBy('sort_order')->get();
    }

    public function chapters()
    {
        return StoryChapter::query()->with(['act', 'scenes'])->orderBy('chapter_number')->get();
    }

    public function scenes()
    {
        return StoryScene::query()->with(['chapter.act', 'dialogues.choices'])->orderBy('chapter_id')->orderBy('scene_order')->get();
    }
}
