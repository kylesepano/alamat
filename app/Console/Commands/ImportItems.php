<?php

namespace App\Console\Commands;

use App\Services\ItemImportService;
use Illuminate\Console\Command;

class ImportItems extends Command
{
    protected $signature = 'alamat:import-items {--file=} {--dry-run} {--generate-prompts}';

    protected $description = 'Import Phase E item codex JSON data.';

    public function handle(ItemImportService $items): int
    {
        $summary = $items->import($this->option('file'), $this->option('dry-run'), $this->option('generate-prompts') || true);
        $this->table(['Metric', 'Value'], collect($summary)->except(['warnings', 'errors'])->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());

        foreach ($summary['warnings'] as $warning) {
            $this->warn(is_array($warning) ? json_encode($warning) : $warning);
        }

        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }

        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
