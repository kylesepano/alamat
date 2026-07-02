<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionAsset extends Model
{
    protected $guarded = [];
    protected $casts = ['creation_date' => 'date', 'last_modified' => 'datetime', 'metadata_payload' => 'array'];
}
