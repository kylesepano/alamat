<?php

namespace Database\Seeders;

use App\Services\ProductionAssetPipelineService;
use App\Services\ProductionPlatformService;
use Illuminate\Database\Seeder;

class ProductionSeeder extends Seeder
{
    public function run(): void
    {
        app(ProductionPlatformService::class)->seedDefaults();
        app(ProductionAssetPipelineService::class)->generatePrompt('ui_icon', 'production', 'dashboard', ['phase' => 'L']);
    }
}
