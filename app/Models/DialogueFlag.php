<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DialogueFlag extends Model
{
    protected $guarded = [];
    protected $casts = ['default_value' => 'boolean', 'is_persistent' => 'boolean'];
}
