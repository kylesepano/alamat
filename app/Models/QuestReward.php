<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestReward extends Model
{
    protected $guarded = [];
    protected $casts = ['reward_payload' => 'array'];
}
