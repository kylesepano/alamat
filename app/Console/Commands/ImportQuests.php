<?php

namespace App\Console\Commands;

use App\Services\QuestImportService;
use Illuminate\Console\Command;

class ImportQuests extends Command
{
    protected $signature = 'alamat:import-quests {--dry-run}';
    protected $description = 'Import Phase H Quest Codex data.';

    public function handle(QuestImportService $quests): int
    {
        $summary = $quests->import($this->option('dry-run'));
        $this->table(['Metric', 'Value'], collect($summary)->except('errors')->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
