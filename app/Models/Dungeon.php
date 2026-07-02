<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dungeon extends Model
{
    protected $guarded = [];
    protected $casts = ['dungeon_rules_payload' => 'array', 'is_active' => 'boolean'];
}
