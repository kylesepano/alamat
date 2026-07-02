<?php

namespace App\Console\Commands;

use App\Services\EquipmentImportService;
use Illuminate\Console\Command;

class ImportEquipment extends Command
{
    protected $signature = 'alamat:import-equipment {--file=} {--dry-run} {--generate-prompts}';
    protected $description = 'Import Phase F equipment data.';

    public function handle(EquipmentImportService $equipment): int
    {
        $summary = $equipment->import($this->option('file'), $this->option('dry-run'), $this->option('generate-prompts'));
        $this->table(['Metric', 'Value'], collect($summary)->except('errors')->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
