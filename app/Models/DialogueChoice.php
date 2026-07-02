<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DialogueChoice extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array', 'consequence_payload' => 'array'];

    public function dialogue(): BelongsTo { return $this->belongsTo(StoryDialogue::class, 'dialogue_id'); }
}
