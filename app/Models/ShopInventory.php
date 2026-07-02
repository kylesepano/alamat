<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShopInventory extends Model
{
    protected $guarded = [];
    protected $casts = ['condition_payload' => 'array'];
}
