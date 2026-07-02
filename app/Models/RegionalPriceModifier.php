<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegionalPriceModifier extends Model
{
    protected $guarded = [];
    protected $casts = ['modifier_payload' => 'array'];
}
