<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcPersonality extends Model
{
    protected $guarded = [];
    protected $casts = ['reaction_tags' => 'array', 'is_active' => 'boolean'];
}
