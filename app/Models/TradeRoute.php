<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TradeRoute extends Model
{
    protected $guarded = [];
    protected $casts = ['goods_payload' => 'array', 'price_effect_payload' => 'array', 'condition_payload' => 'array'];
}
