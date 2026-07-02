<?php

namespace Database\Seeders;

use App\Services\NPCImportService;
use Illuminate\Database\Seeder;

class NPCSeeder extends Seeder
{
    public function run(): void
    {
        app(NPCImportService::class)->import();
    }
}
