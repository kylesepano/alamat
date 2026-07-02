<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionQaReport extends Model
{
    protected $guarded = [];
    protected $casts = ['checks_payload' => 'array', 'issues_payload' => 'array', 'generated_at' => 'datetime'];
}
