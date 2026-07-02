<?php

namespace Database\Seeders;

use App\Models\LibraryItemCategory;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class ItemCategorySeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'item_categories';

    protected string $modelClass = LibraryItemCategory::class;
}
