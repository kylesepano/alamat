<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorldEvent extends Model
{
    protected $guarded = [];
    protected $casts = ['trigger_payload' => 'array', 'result_payload' => 'array', 'is_active' => 'boolean'];
}
