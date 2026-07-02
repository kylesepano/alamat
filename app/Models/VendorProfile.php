<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VendorProfile extends Model
{
    protected $guarded = [];
    protected $casts = ['relationship_discount_payload' => 'array', 'is_active' => 'boolean'];
}
