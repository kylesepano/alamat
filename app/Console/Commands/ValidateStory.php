<?php

namespace App\Console\Commands;

use App\Services\StoryImportService;
use Illuminate\Console\Command;

class ValidateStory extends Command
{
    protected $signature = 'alamat:validate-story';
    protected $description = 'Validate Phase K Story Bible data.';

    public function handle(StoryImportService $story): int
    {
        $summary = $story->import(dryRun: true);
        $this->info('Validated story data with '.count($summary['errors']).' error(s) and '.count($summary['warnings']).' warning(s).');
        foreach ($summary['warnings'] as $warning) {
            $this->warn(json_encode($warning));
        }
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }

        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
