<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportWorld extends Command
{
    protected $signature = 'alamat:import:world {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for world data.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('world', (bool) $this->option('dry-run'));
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
