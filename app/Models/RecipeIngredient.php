<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RecipeIngredient extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array', 'consume_on_use' => 'boolean'];
}
