<?php

namespace Database\Seeders;

use App\Models\LibraryTemperament;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class TemperamentSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'temperaments';

    protected string $modelClass = LibraryTemperament::class;
}
