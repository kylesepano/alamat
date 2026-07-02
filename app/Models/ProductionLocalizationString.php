<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionLocalizationString extends Model
{
    protected $guarded = [];
    protected $casts = ['metadata_payload' => 'array'];
}
