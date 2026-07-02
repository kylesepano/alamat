<?php

namespace App\Console\Commands;

use App\Services\RecipeImportService;
use Illuminate\Console\Command;

class ImportEconomy extends Command
{
    protected $signature = 'alamat:import-economy {--dry-run}';
    protected $description = 'Import Phase J crafting and economy data.';

    public function handle(RecipeImportService $economy): int
    {
        $summary = $economy->import($this->option('dry-run'));
        $this->table(['Metric', 'Value'], collect($summary)->except('errors')->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
