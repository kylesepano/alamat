<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoryScene extends Model
{
    protected $guarded = [];
    protected $casts = ['participating_npcs' => 'array', 'participating_monsters' => 'array', 'story_flags' => 'array'];

    public function chapter(): BelongsTo { return $this->belongsTo(StoryChapter::class, 'chapter_id'); }
    public function location(): BelongsTo { return $this->belongsTo(Location::class, 'location_id'); }
    public function dialogues(): HasMany { return $this->hasMany(StoryDialogue::class, 'scene_id'); }
}
