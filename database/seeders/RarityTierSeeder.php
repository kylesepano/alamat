<?php

namespace Database\Seeders;

use App\Models\LibraryRarityTier;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class RarityTierSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'rarity_tiers';

    protected string $modelClass = LibraryRarityTier::class;
}
