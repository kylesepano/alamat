<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NpcDialogue extends Model
{
    protected $guarded = [];
    protected $casts = ['nodes' => 'array', 'is_active' => 'boolean'];

    public function conditions(): HasMany
    {
        return $this->hasMany(NpcDialogueCondition::class, 'dialogue_id');
    }
}
