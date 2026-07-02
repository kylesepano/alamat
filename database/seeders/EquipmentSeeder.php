<?php

namespace Database\Seeders;

use App\Services\EquipmentImportService;
use Illuminate\Database\Seeder;

class EquipmentSeeder extends Seeder
{
    public function run(): void
    {
        app(EquipmentImportService::class)->import(generatePrompts: true);
    }
}
