<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcQuest extends Model
{
    protected $guarded = [];
    protected $casts = ['requirements_payload' => 'array', 'rewards_payload' => 'array', 'is_repeatable' => 'boolean'];
}
