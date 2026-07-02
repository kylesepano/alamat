<?php

namespace Database\Seeders;

use App\Models\LibrarySkillCategory;
use Database\Seeders\Concerns\SeedsLibraryFromJson;
use Illuminate\Database\Seeder;

class SkillCategorySeeder extends Seeder
{
    use SeedsLibraryFromJson;

    protected string $libraryKey = 'skill_categories';

    protected string $modelClass = LibrarySkillCategory::class;
}
