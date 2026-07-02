<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportMonsters extends Command
{
    protected $signature = 'alamat:import:monsters {--file=monsters_batch_001.json} {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for monsters.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('monsters', (bool) $this->option('dry-run'), ['file' => $this->option('file')]);
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
