<?php

namespace Database\Seeders;

use App\Models\LibraryAiBehavior;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class AiBehaviorSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'ai_behaviors';

    protected string $modelClass = LibraryAiBehavior::class;
}
