<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CharacterRelationship extends Model
{
    protected $guarded = [];
    protected $casts = ['unlock_condition_payload' => 'array', 'story_impact_payload' => 'array'];
}
