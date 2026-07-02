<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TrustMethod extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'example_use_case'];
}
