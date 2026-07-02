<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionBuildRun extends Model
{
    protected $guarded = [];
    protected $casts = ['manifest_payload' => 'array', 'steps_payload' => 'array', 'started_at' => 'datetime', 'finished_at' => 'datetime'];
}
