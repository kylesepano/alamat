<?php

namespace App\Console\Commands;

use App\Services\ProductionImportPipelineService;
use Illuminate\Console\Command;

class ProductionImportEquipment extends Command
{
    protected $signature = 'alamat:import:equipment {--file=} {--dry-run}';
    protected $description = 'Run the Phase L import pipeline for equipment.';

    public function handle(ProductionImportPipelineService $pipeline): int
    {
        $result = $pipeline->run('equipment', (bool) $this->option('dry-run'), ['file' => $this->option('file')]);
        $this->info(json_encode($result['summary_payload'], JSON_PRETTY_PRINT));
        return $result['status'] === 'completed' ? self::SUCCESS : self::FAILURE;
    }
}
