<?php

namespace App\Console\Commands;

use App\Services\EquipmentImportService;
use Illuminate\Console\Command;

class ValidateEquipment extends Command
{
    protected $signature = 'alamat:validate-equipment {--file=}';
    protected $description = 'Validate Phase F equipment data.';

    public function handle(EquipmentImportService $equipment): int
    {
        $summary = $equipment->import($this->option('file'), dryRun: true, generatePrompts: true);
        $this->info('Validated equipment with '.count($summary['errors']).' error(s).');
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
