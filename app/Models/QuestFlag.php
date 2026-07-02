<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestFlag extends Model
{
    protected $guarded = [];
    protected $casts = ['default_value' => 'boolean'];
}
