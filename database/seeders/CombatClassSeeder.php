<?php

namespace Database\Seeders;

use App\Models\LibraryCombatClass;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class CombatClassSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'combat_classes';

    protected string $modelClass = LibraryCombatClass::class;
}
