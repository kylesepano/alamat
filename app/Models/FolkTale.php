<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FolkTale extends Model
{
    protected $guarded = [];
    protected $casts = ['moral_axes' => 'array', 'related_monsters' => 'array'];
}
