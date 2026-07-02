<?php

namespace Database\Seeders;

use App\Services\CombatBibleImportService;
use Illuminate\Database\Seeder;

class CombatBibleSeeder extends Seeder
{
    public function run(): void
    {
        app(CombatBibleImportService::class)->importExamples(dryRun: false);
    }
}
