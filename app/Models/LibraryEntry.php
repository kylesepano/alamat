<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

abstract class LibraryEntry extends Model
{
    protected $guarded = [];

    protected $casts = [
        'id' => 'integer',
        'sort_order' => 'integer',
        'is_active' => 'boolean',
        'stackable' => 'boolean',
        'rank_order' => 'integer',
    ];
}
