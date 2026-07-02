<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EndingRoute extends Model
{
    protected $guarded = [];
    protected $casts = ['requirement_payload' => 'array', 'consequence_payload' => 'array', 'is_canonical_optional' => 'boolean'];

    public function epilogues(): HasMany { return $this->hasMany(Epilogue::class, 'ending_id'); }
}
