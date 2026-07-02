<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestChain extends Model
{
    protected $guarded = [];
    protected $casts = ['quest_ids' => 'array', 'chain_order' => 'array', 'completion_reward_payload' => 'array'];
}
