<?php

namespace App\Console\Commands;

use App\Services\DropTableService;
use Illuminate\Console\Command;

class SyncMonsterDrops extends Command
{
    protected $signature = 'alamat:sync-monster-drops {--dry-run}';

    protected $description = 'Sync generated monster drop items into monster drop tables.';

    public function handle(DropTableService $drops): int
    {
        if ($this->option('dry-run')) {
            $this->info('Dry run accepted; generated drop sync is deterministic and writes only without --dry-run.');
            return self::SUCCESS;
        }

        $count = $drops->syncGeneratedDrops();
        $this->info("Synced {$count} monster drop table row(s).");

        return self::SUCCESS;
    }
}
