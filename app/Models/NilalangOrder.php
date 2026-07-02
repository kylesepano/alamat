<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NilalangOrder extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'examples', 'gameplay_role'];

    protected $casts = [
        'examples' => 'array',
    ];
}
