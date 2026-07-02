<?php

namespace App\Console\Commands;

use App\Services\ProductionPlatformService;
use Illuminate\Console\Command;

class ProductionSeedDefaults extends Command
{
    protected $signature = 'alamat:production:seed-defaults';
    protected $description = 'Seed baseline Phase L production pipeline metadata.';

    public function handle(ProductionPlatformService $platform): int
    {
        $platform->seedDefaults();
        $this->info('Production defaults seeded.');
        return self::SUCCESS;
    }
}
