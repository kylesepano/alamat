<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Affiliation extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'theme', 'color_hint', 'icon_hint'];
}
