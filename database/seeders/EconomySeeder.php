<?php

namespace Database\Seeders;

use App\Services\RecipeImportService;
use Illuminate\Database\Seeder;

class EconomySeeder extends Seeder
{
    public function run(): void
    {
        app(RecipeImportService::class)->import();
    }
}
