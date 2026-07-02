<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EconomyEvent extends Model
{
    protected $guarded = [];
    protected $casts = ['trigger_payload' => 'array', 'effect_payload' => 'array', 'is_active' => 'boolean'];
}
