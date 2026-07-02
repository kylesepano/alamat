<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Epilogue extends Model
{
    protected $guarded = [];
    protected $casts = ['affected_regions' => 'array', 'affected_characters' => 'array'];

    public function ending(): BelongsTo { return $this->belongsTo(EndingRoute::class, 'ending_id'); }
}
