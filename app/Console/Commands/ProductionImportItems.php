<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportItems extends Command
{
    protected $signature = 'alamat:import:items {--file=} {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for items.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('items', (bool) $this->option('dry-run'), ['file' => $this->option('file')]);
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
