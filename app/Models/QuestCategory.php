<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestCategory extends Model
{
    protected $guarded = [];
    protected $casts = ['is_active' => 'boolean'];
}
