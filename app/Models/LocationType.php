<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LocationType extends Model
{
    protected $guarded = [];
    protected $casts = ['is_active' => 'boolean'];
}
