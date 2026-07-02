<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FestivalMarket extends Model
{
    protected $guarded = [];
    protected $casts = ['schedule_payload' => 'array', 'featured_goods_payload' => 'array', 'condition_payload' => 'array', 'is_active' => 'boolean'];
}
