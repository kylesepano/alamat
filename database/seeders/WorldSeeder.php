<?php

namespace Database\Seeders;

use App\Services\LocationImportService;
use Illuminate\Database\Seeder;

class WorldSeeder extends Seeder
{
    public function run(): void
    {
        app(LocationImportService::class)->import();
    }
}
