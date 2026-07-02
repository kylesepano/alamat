<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StoryAct extends Model
{
    protected $guarded = [];

    public function chapters(): HasMany { return $this->hasMany(StoryChapter::class, 'act_id')->orderBy('chapter_number'); }
}
