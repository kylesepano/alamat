<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionConsoleLog extends Model
{
    protected $guarded = [];
    protected $casts = ['payload' => 'array', 'executed_at' => 'datetime'];
}
