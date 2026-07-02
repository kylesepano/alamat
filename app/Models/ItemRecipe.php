<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ItemRecipe extends Model
{
    protected $guarded = [];

    protected $casts = [
        'ingredients' => 'array',
        'success_rate' => 'decimal:2',
    ];

    public function outputItem(): BelongsTo
    {
        return $this->belongsTo(Item::class, 'output_item_id');
    }
}
