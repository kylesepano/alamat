<?php

namespace App\Services;

use App\Models\ProductionImportJob;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;

class ProductionImportPipelineService
{
    private const COMMANDS = [
        'monsters' => 'alamat:import-monsters',
        'items' => 'alamat:import-items',
        'equipment' => 'alamat:import-equipment',
        'npcs' => 'alamat:import-npcs',
        'quests' => 'alamat:import-quests',
        'world' => 'alamat:import-world',
        'story' => 'alamat:import-story',
        'economy' => 'alamat:import-economy',
    ];

    public function run(string $codex, bool $dryRun = true, array $options = []): array
    {
        if (! isset(self::COMMANDS[$codex])) {
            throw new \InvalidArgumentException("Unsupported import codex [{$codex}].");
        }

        $startedAt = now();

        $parameters = $dryRun ? ['--dry-run' => true] : [];
        if ($codex === 'monsters' && isset($options['file'])) {
            $parameters['--file'] = $options['file'];
        }
        if (in_array($codex, ['items', 'equipment'], true) && isset($options['file'])) {
            $parameters['--file'] = $options['file'];
        }

        $exitCode = Artisan::call(self::COMMANDS[$codex], $parameters);
        $output = Artisan::output();

        $summary = ['exit_code' => $exitCode, 'command' => self::COMMANDS[$codex], 'output' => $output];
        $job = ProductionImportJob::query()->create([
            'job_id' => 'IMP-'.Str::upper(Str::random(10)),
            'codex' => $codex,
            'source_path' => $options['source_path'] ?? null,
            'dry_run' => $dryRun,
            'options_payload' => $options,
            'status' => $exitCode === 0 ? 'completed' : 'failed',
            'summary_payload' => $summary,
            'errors_payload' => $exitCode === 0 ? [] : [['message' => 'Command failed. Review output.', 'output' => $output]],
            'started_at' => $startedAt,
            'finished_at' => now(),
        ]);

        return $job->fresh()->toArray();
    }

    public function latest()
    {
        return ProductionImportJob::query()->latest()->limit(20)->get();
    }
}
