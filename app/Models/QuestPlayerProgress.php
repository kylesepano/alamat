<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestPlayerProgress extends Model
{
    protected $guarded = [];
    protected $casts = ['progress_payload' => 'array', 'chosen_branches' => 'array', 'started_at' => 'datetime', 'completed_at' => 'datetime'];
}
