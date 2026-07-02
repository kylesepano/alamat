<?php

namespace App\Console\Commands;

use App\Services\QuestImportService;
use Illuminate\Console\Command;

class ValidateQuests extends Command
{
    protected $signature = 'alamat:validate-quests';
    protected $description = 'Validate Phase H Quest Codex data.';

    public function handle(QuestImportService $quests): int
    {
        $summary = $quests->import(dryRun: true);
        $this->info('Validated quest data with '.count($summary['errors']).' error(s).');
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
