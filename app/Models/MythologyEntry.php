<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MythologyEntry extends Model
{
    protected $guarded = [];
    protected $casts = ['rules' => 'array', 'related_realms' => 'array'];
}
