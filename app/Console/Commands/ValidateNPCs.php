<?php

namespace App\Console\Commands;

use App\Services\NPCImportService;
use Illuminate\Console\Command;

class ValidateNPCs extends Command
{
    protected $signature = 'alamat:validate-npcs';
    protected $description = 'Validate Phase G NPC Codex data without writing.';

    public function handle(NPCImportService $npcs): int
    {
        $summary = $npcs->import(dryRun: true);
        $this->info('Validated NPC data with '.count($summary['errors']).' error(s).');
        foreach ($summary['errors'] as $error) {
            $this->error(json_encode($error));
        }
        return count($summary['errors']) === 0 ? self::SUCCESS : self::FAILURE;
    }
}
