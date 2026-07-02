<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoryChapter extends Model
{
    protected $guarded = [];
    protected $casts = ['major_quests' => 'array', 'important_npcs' => 'array', 'major_monsters' => 'array', 'legendary_encounters' => 'array', 'regional_exploration' => 'array', 'moral_choices' => 'array', 'unlock_conditions' => 'array', 'completion_conditions' => 'array'];

    public function act(): BelongsTo { return $this->belongsTo(StoryAct::class, 'act_id'); }
    public function scenes(): HasMany { return $this->hasMany(StoryScene::class, 'chapter_id')->orderBy('scene_order'); }
}
