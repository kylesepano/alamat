<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CombatBibleEntry extends Model
{
    protected $guarded = [];

    protected $casts = [
        'payload' => 'array',
        'is_active' => 'boolean',
    ];

    public function outgoingReferences(): HasMany
    {
        return $this->hasMany(CombatBibleReference::class, 'source_entry_id');
    }

    public function incomingReferences(): HasMany
    {
        return $this->hasMany(CombatBibleReference::class, 'target_entry_id');
    }
}
