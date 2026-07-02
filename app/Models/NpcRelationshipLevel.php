<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcRelationshipLevel extends Model
{
    protected $guarded = [];
    protected $casts = ['dialogue_unlocks' => 'array', 'is_active' => 'boolean'];
}
