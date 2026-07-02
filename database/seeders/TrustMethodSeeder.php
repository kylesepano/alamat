<?php

namespace Database\Seeders;

use App\Models\LibraryTrustMethod;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class TrustMethodSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'trust_methods';

    protected string $modelClass = LibraryTrustMethod::class;
}
