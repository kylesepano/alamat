<?php

namespace Database\Seeders;

use App\Services\DropTableService;
use App\Services\ItemImportService;
use Illuminate\Database\Seeder;

class ItemSeeder extends Seeder
{
    public function run(): void
    {
        app(ItemImportService::class)->import(generatePrompts: true);
        app(DropTableService::class)->syncGeneratedDrops();
    }
}
