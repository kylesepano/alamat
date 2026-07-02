<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NpcVoiceProfile extends Model
{
    protected $guarded = [];
    protected $casts = ['catchphrases' => 'array', 'battle_callouts' => 'array'];
}
