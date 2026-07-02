<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionAnalyticsEvent extends Model
{
    protected $guarded = [];
    protected $casts = ['payload' => 'array', 'opt_in' => 'boolean', 'occurred_at' => 'datetime'];
}
