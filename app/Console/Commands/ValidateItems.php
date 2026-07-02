<?php

namespace App\Console\Commands;

use App\Services\ItemImportService;
use Illuminate\Console\Command;

class ValidateItems extends Command
{
    protected $signature = 'alamat:validate-items {--file=}';

    protected $description = 'Validate Phase E item data with a dry-run import.';

    public function handle(ItemImportService $items): int
    {
        $summary = $items->import($this->option('file'), dryRun: true, generatePrompts: true);
        $this->info('Validated items with '.count($summary['errors']).' error(s).');

        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }

        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
