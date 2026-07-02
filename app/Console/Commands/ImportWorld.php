<?php

namespace App\Console\Commands;

use App\Services\LocationImportService;
use Illuminate\Console\Command;

class ImportWorld extends Command
{
    protected $signature = 'alamat:import-world {--dry-run}';
    protected $description = 'Import Phase I World Codex data.';

    public function handle(LocationImportService $world): int
    {
        $summary = $world->import($this->option('dry-run'));
        $this->table(['Metric', 'Value'], collect($summary)->except('errors')->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
