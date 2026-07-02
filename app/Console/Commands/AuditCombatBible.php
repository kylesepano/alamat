<?php

namespace App\Console\Commands;

use App\Services\CombatBibleImportService;
use Illuminate\Console\Command;

class AuditCombatBible extends Command
{
    protected $signature = 'alamat:combat-bible-audit {--import-examples : Import architecture example records into the registry} {--dry-run : Validate imports without writing}';

    protected $description = 'Audit the Phase D Combat Bible architecture files and optional example imports.';

    public function handle(CombatBibleImportService $combatBible): int
    {
        $audit = $combatBible->audit();

        $this->table(
            ['Path', 'Schema', 'Example', 'Schema Valid', 'Examples', 'Errors'],
            collect($audit['modules'])->map(fn (array $row): array => [
                $row['path'],
                $row['schema_exists'] ? 'yes' : 'no',
                $row['example_exists'] ? 'yes' : 'no',
                $row['schema_valid'] ? 'yes' : 'no',
                $row['example_count'],
                count($row['errors']),
            ])->all(),
        );

        if ($this->option('import-examples')) {
            $summary = $combatBible->importExamples($this->option('dry-run'));
            $this->info('Example import summary: '.json_encode($summary));
        }

        return $audit['failed_modules'] === 0 ? self::SUCCESS : self::FAILURE;
    }
}
