<?php

namespace Database\Seeders;

use App\Models\LibraryDamageType;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class DamageTypeSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'damage_types';

    protected string $modelClass = LibraryDamageType::class;
}
