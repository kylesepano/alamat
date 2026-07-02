<?php

namespace Database\Seeders;

use App\Models\LibraryPersonalityTrait;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class PersonalityTraitSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'personality_traits';

    protected string $modelClass = LibraryPersonalityTrait::class;
}
