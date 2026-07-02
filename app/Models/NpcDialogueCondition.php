<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcDialogueCondition extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array'];
}
