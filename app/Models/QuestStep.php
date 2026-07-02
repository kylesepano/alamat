<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestStep extends Model
{
    protected $guarded = [];
    protected $casts = ['target_payload' => 'array', 'optional' => 'boolean'];
}
