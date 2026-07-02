<?php

namespace Database\Seeders;

use App\Models\LibraryGrowthRank;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class GrowthRankSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'growth_ranks';

    protected string $modelClass = LibraryGrowthRank::class;
}
