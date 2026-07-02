<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cutscene extends Model
{
    protected $guarded = [];
    protected $casts = ['trigger_payload' => 'array', 'storyboard_payload' => 'array', 'skippable' => 'boolean', 'replayable' => 'boolean'];

    public function scene(): BelongsTo { return $this->belongsTo(StoryScene::class, 'scene_id'); }
}
