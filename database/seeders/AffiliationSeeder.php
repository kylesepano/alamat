<?php

namespace Database\Seeders;

use App\Models\LibraryAffiliation;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class AffiliationSeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'affiliations';

    protected string $modelClass = LibraryAffiliation::class;
}
