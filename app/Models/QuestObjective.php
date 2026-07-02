<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestObjective extends Model
{
    protected $guarded = [];
    protected $casts = ['target_payload' => 'array', 'is_hidden' => 'boolean'];
}
