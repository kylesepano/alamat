<?php

namespace App\Console\Commands;

use App\Services\RecipeImportService;
use Illuminate\Console\Command;

class ValidateEconomy extends Command
{
    protected $signature = 'alamat:validate-economy';
    protected $description = 'Validate Phase J crafting and economy data.';

    public function handle(RecipeImportService $economy): int
    {
        $summary = $economy->import(dryRun: true);
        $this->info('Validated economy data with '.count($summary['errors']).' error(s).');
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
