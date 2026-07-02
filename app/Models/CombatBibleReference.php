<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CombatBibleReference extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_required' => 'boolean',
    ];

    public function sourceEntry(): BelongsTo
    {
        return $this->belongsTo(CombatBibleEntry::class, 'source_entry_id');
    }

    public function targetEntry(): BelongsTo
    {
        return $this->belongsTo(CombatBibleEntry::class, 'target_entry_id');
    }
}
