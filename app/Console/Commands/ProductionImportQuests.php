<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportQuests extends Command
{
    protected $signature = 'alamat:import:quests {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for quests.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('quests', (bool) $this->option('dry-run'));
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
