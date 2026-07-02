<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportStory extends Command
{
    protected $signature = 'alamat:import:story {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for story data.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('story', (bool) $this->option('dry-run'));
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
