<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestBranch extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array', 'result_payload' => 'array'];
}
