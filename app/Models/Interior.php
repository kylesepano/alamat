<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Interior extends Model
{
    protected $guarded = [];
    protected $casts = ['is_active' => 'boolean'];
}
