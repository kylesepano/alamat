<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorldRoute extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array', 'is_active' => 'boolean'];
}
