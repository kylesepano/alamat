<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CombatClass extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'battle_role', 'stat_focus'];

    protected $casts = [
        'stat_focus' => 'array',
    ];
}
