<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BarterRule extends Model
{
    protected $guarded = [];
    protected $casts = ['offered_payload' => 'array', 'requested_payload' => 'array', 'condition_payload' => 'array', 'success_modifier_payload' => 'array'];
}
