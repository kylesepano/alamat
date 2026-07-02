<?php

namespace App\Console\Commands;

use App\Services\LocationImportService;
use Illuminate\Console\Command;

class ValidateWorld extends Command
{
    protected $signature = 'alamat:validate-world';
    protected $description = 'Validate Phase I World Codex data.';

    public function handle(LocationImportService $world): int
    {
        $summary = $world->import(dryRun: true);
        $this->info('Validated world data with '.count($summary['errors']).' error(s).');
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
