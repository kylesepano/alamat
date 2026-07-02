<?php

namespace App\Console\Commands;

use App\Services\EquipmentImportService;
use Illuminate\Console\Command;

class SyncEquipmentSets extends Command
{
    protected $signature = 'alamat:sync-equipment-sets {--dry-run}';
    protected $description = 'Sync equipment sets from Phase F source JSON.';

    public function handle(EquipmentImportService $equipment): int
    {
        $summary = $equipment->import(dryRun: $this->option('dry-run'), generatePrompts: true);
        $this->info("Sets imported/updated: {$summary['sets_imported']}/{$summary['sets_updated']}; set items: {$summary['set_items']}");
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
