<?php

namespace App\Console\Commands;

use App\Services\NPCImportService;
use Illuminate\Console\Command;

class ImportNPCs extends Command
{
    protected $signature = 'alamat:import-npcs {--dry-run}';
    protected $description = 'Import Phase G NPC Codex data.';

    public function handle(NPCImportService $npcs): int
    {
        $summary = $npcs->import($this->option('dry-run'));
        $this->table(['Metric', 'Value'], collect($summary)->except('errors')->map(fn ($value, $key) => [$key, is_bool($value) ? ($value ? 'true' : 'false') : $value])->values());
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
