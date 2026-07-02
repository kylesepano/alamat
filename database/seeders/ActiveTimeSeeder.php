<?php

namespace Database\Seeders;

use App\Models\LibraryActiveTime;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class ActiveTimeSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'active_times';

    protected string $modelClass = LibraryActiveTime::class;
}
