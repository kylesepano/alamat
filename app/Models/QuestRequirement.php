<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestRequirement extends Model
{
    protected $guarded = [];
    protected $casts = ['requirement_payload' => 'array'];
}
