<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoryDialogue extends Model
{
    protected $table = 'dialogues';
    protected $guarded = [];
    protected $casts = ['player_choices' => 'array', 'conditions' => 'array', 'consequences' => 'array'];

    public function scene(): BelongsTo { return $this->belongsTo(StoryScene::class, 'scene_id'); }
    public function choices(): HasMany { return $this->hasMany(DialogueChoice::class, 'dialogue_id')->orderBy('sort_order'); }
}
