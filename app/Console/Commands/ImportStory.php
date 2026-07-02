<?php

namespace App\Console\Commands;

use App\Services\StoryImportService;
use Illuminate\Console\Command;

class ImportStory extends Command
{
    protected $signature = 'alamat:import-story {--dry-run}';
    protected $description = 'Import Phase K Story Bible data.';

    public function handle(StoryImportService $story): int
    {
        $summary = $story->import($this->option('dry-run'));
        $this->table(['Metric', 'Value'], collect($summary)->except(['errors', 'warnings'])->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['warnings'] as $warning) {
            $this->warn(json_encode($warning));
        }
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }

        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
