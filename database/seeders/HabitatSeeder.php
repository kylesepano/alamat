<?php

namespace Database\Seeders;

use App\Models\LibraryHabitat;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class HabitatSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'habitats';

    protected string $modelClass = LibraryHabitat::class;
}
