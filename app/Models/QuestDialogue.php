<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestDialogue extends Model
{
    protected $guarded = [];
    protected $casts = ['nodes' => 'array', 'condition_payload' => 'array'];
}
