<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoreAge extends Model
{
    protected $fillable = ['title', 'slug', 'short_description', 'long_description', 'sort_order'];
}
