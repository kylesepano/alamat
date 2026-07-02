<?php

namespace App\Services;

use App\Models\Equipment;
use App\Models\Item;
use App\Models\Monster;
use App\Models\Npc;
use App\Models\ProductionExportJob;
use App\Models\Quest;
use App\Models\Recipe;
use App\Models\StoryAct;
use App\Models\WorldRegion;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductionExportService
{
    private const MODELS = [
        'monsters' => Monster::class,
        'items' => Item::class,
        'equipment' => Equipment::class,
        'npcs' => Npc::class,
        'quests' => Quest::class,
        'world' => WorldRegion::class,
        'story' => StoryAct::class,
        'economy' => Recipe::class,
    ];

    public function export(string $codex, string $format = 'json', array $filters = []): array
    {
        if (! isset(self::MODELS[$codex])) {
            throw new \InvalidArgumentException("Unsupported export codex [{$codex}].");
        }

        $job = ProductionExportJob::query()->create([
            'job_id' => 'EXP-'.Str::upper(Str::random(10)),
            'codex' => $codex,
            'format' => $format,
            'filters_payload' => $filters,
            'status' => 'running',
            'started_at' => now(),
        ]);

        $rows = self::MODELS[$codex]::query()->limit((int) ($filters['limit'] ?? 1000))->get()->toArray();
        $directory = storage_path('export_logs');
        File::ensureDirectoryExists($directory);
        $path = $directory.'/'.$job->job_id.'.'.$this->extension($format);
        File::put($path, $this->serialize($rows, $format, $codex));

        $job->update([
            'status' => 'completed',
            'output_path' => $path,
            'summary_payload' => ['rows' => count($rows), 'format' => $format, 'filters' => $filters],
            'finished_at' => now(),
        ]);

        return $job->fresh()->toArray();
    }

    public function latest()
    {
        return ProductionExportJob::query()->latest()->limit(20)->get();
    }

    private function serialize(array $rows, string $format, string $codex): string
    {
        return match ($format) {
            'csv' => $this->csv($rows),
            'markdown' => "# {$codex} Export\n\n```json\n".json_encode($rows, JSON_PRETTY_PRINT)."\n```\n",
            'sql' => '-- SQL seeder export placeholder for '.$codex.PHP_EOL.'-- Use JSON payload for canonical imports.'.PHP_EOL,
            default => json_encode($rows, JSON_PRETTY_PRINT),
        };
    }

    private function extension(string $format): string
    {
        return ['markdown' => 'md', 'sql' => 'sql'][$format] ?? $format;
    }

    private function csv(array $rows): string
    {
        if ($rows === []) {
            return '';
        }

        $handle = fopen('php://temp', 'r+');
        fputcsv($handle, array_keys($rows[0]));
        foreach ($rows as $row) {
            fputcsv($handle, array_map(fn ($value) => is_scalar($value) || $value === null ? $value : json_encode($value), $row));
        }
        rewind($handle);
        return stream_get_contents($handle);
    }
}
