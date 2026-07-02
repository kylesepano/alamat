<?php

namespace Database\Seeders;

use App\Models\LibraryTargetType;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class TargetTypeSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'target_types';

    protected string $modelClass = LibraryTargetType::class;
}
