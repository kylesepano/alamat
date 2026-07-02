<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Currency extends Model
{
    protected $guarded = [];
    protected $casts = ['exchange_rate_payload' => 'array', 'is_primary' => 'boolean', 'is_active' => 'boolean'];
}
