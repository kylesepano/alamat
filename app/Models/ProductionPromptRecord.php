<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductionPromptRecord extends Model
{
    protected $guarded = [];
    protected $casts = ['parameters_payload' => 'array'];
}
