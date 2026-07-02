<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionImportJob extends Model
{
    protected $guarded = [];
    protected $casts = ['dry_run' => 'boolean', 'options_payload' => 'array', 'summary_payload' => 'array', 'errors_payload' => 'array', 'started_at' => 'datetime', 'finished_at' => 'datetime'];
}
