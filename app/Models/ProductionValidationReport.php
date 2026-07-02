<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionValidationReport extends Model
{
    protected $guarded = [];
    protected $casts = ['rules_payload' => 'array', 'summary_payload' => 'array', 'issues_payload' => 'array', 'generated_at' => 'datetime'];
}
