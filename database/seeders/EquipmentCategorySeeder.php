<?php

namespace Database\Seeders;

use App\Models\LibraryEquipmentCategory;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class EquipmentCategorySeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'equipment_categories';

    protected string $modelClass = LibraryEquipmentCategory::class;
}
