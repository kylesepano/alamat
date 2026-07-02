<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionSaveVersion extends Model
{
    protected $guarded = [];
    protected $casts = ['schema_payload' => 'array', 'migration_payload' => 'array', 'is_current' => 'boolean'];
}
