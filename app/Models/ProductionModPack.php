<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionModPack extends Model
{
    protected $guarded = [];
    protected $casts = ['allowed_content_payload' => 'array', 'validation_payload' => 'array'];
}
