<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GrowthRank extends Model
{
    protected $fillable = ['rank', 'slug', 'description', 'sort_order'];
}
