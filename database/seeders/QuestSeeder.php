<?php

namespace Database\Seeders;

use App\Services\QuestImportService;
use Illuminate\Database\Seeder;

class QuestSeeder extends Seeder
{
    public function run(): void
    {
        app(QuestImportService::class)->import();
    }
}
