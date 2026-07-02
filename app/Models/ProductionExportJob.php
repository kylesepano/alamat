<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionExportJob extends Model
{
    protected $guarded = [];
    protected $casts = ['filters_payload' => 'array', 'summary_payload' => 'array', 'started_at' => 'datetime', 'finished_at' => 'datetime'];
}
