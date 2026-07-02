<?php

namespace Database\Seeders;

use App\Services\StoryImportService;
use Illuminate\Database\Seeder;

class StorySeeder extends Seeder
{
    public function run(): void
    {
        app(StoryImportService::class)->import();
    }
}
