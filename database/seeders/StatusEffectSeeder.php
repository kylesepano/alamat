<?php

namespace Database\Seeders;

use App\Models\LibraryStatusEffect;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class StatusEffectSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'status_effects';

    protected string $modelClass = LibraryStatusEffect::class;
}
