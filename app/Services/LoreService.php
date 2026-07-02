<?php

namespace App\Services;

use App\Models\FolkTale;
use App\Models\LoreBook;
use App\Models\Poem;
use App\Models\Song;

class LoreService
{
    public function library(): array
    {
        return [
            'books' => LoreBook::query()->orderBy('sort_order')->get(),
            'folk_tales' => FolkTale::query()->orderBy('title')->get(),
            'songs' => Song::query()->orderBy('song_type')->get(),
            'poems' => Poem::query()->orderBy('title')->get(),
        ];
    }
}
