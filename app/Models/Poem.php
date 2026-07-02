<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Poem extends Model
{
    protected $guarded = [];

    public function chapter(): BelongsTo { return $this->belongsTo(StoryChapter::class, 'related_chapter_id'); }
}
