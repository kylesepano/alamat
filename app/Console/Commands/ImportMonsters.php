<?php

namespace App\Console\Commands;

use App\Services\MonsterImportService;
use Illuminate\Console\Command;

class ImportMonsters extends Command
{
    protected $signature = 'alamat:import-monsters {--file=monsters_batch_001.json} {--format=json} {--dry-run}';

    protected $description = 'Import ALAMAT Nilalang Codex entries from database/data/monsters JSON or CSV files.';

    public function handle(MonsterImportService $imports): int
    {
        try {
            $result = $imports->import(
                file: (string) $this->option('file'),
                format: (string) $this->option('format'),
                dryRun: (bool) $this->option('dry-run'),
            );
        } catch (\Throwable $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $this->info('Monster import summary');
        $this->table(
            ['Metric', 'Value'],
            [
                ['Imported Monsters', $result['imported_monsters']],
                ['Updated Monsters', $result['updated_monsters']],
                ['Imported Unique Skills', $result['imported_unique_skills']],
                ['Updated Unique Skills', $result['updated_unique_skills']],
                ['Imported Common Skills', $result['imported_common_skills']],
                ['Updated Common Skills', $result['updated_common_skills']],
                ['Skipped', $result['skipped']],
                ['Warnings', count($result['warnings'])],
                ['Errors', count($result['errors'])],
                ['Elapsed Time', $result['elapsed_time'].'s'],
            ],
        );

        if ($result['dry_run']) {
            $this->warn('Dry run completed; database changes were rolled back.');
        }

        if ($result['warnings'] !== []) {
            $this->warn('Warnings:');
            foreach ($result['warnings'] as $warning) {
                $this->line("- {$warning}");
            }
        }

        if ($result['errors'] !== []) {
            $this->warn('Skipped rows:');
            $this->table(['row', 'monster_id', 'reason'], $result['errors']);
        }

        return self::SUCCESS;
    }
}
