<?php

namespace App\Services;

use App\Models\ProductionValidationReport;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class ProductionValidationService
{
    public function validate(string $scope = 'all'): array
    {
        $rules = json_decode(File::get(base_path('database/validation_rules/production_validation_rules.json')), true);
        $issues = [];
        $roots = $scope === 'all' ? $rules['content_roots'] : array_filter($rules['content_roots'], fn ($root) => str_contains($root, $scope));

        foreach ($roots as $root) {
            $path = base_path($root);
            if (! File::isDirectory($path)) {
                $issues[] = ['severity' => 'warning', 'rule' => 'content_root_exists', 'path' => $root, 'message' => 'Content root is missing.'];
                continue;
            }
            foreach (File::files($path) as $file) {
                if ($file->getExtension() !== 'json') {
                    continue;
                }
                $this->validateJsonFile($file->getPathname(), $issues);
            }
        }

        $report = ProductionValidationReport::query()->create([
            'report_id' => 'VAL-'.Str::upper(Str::random(10)),
            'scope' => $scope,
            'status' => collect($issues)->contains(fn ($issue) => $issue['severity'] === 'error') ? 'failed' : 'passed',
            'rules_payload' => $rules['rules'],
            'summary_payload' => ['files_checked' => $this->countJsonFiles($roots), 'issue_count' => count($issues)],
            'issues_payload' => $issues,
            'generated_at' => now(),
        ]);

        $jsonPath = storage_path('validation_reports/'.$report->report_id.'.json');
        $htmlPath = storage_path('validation_reports/'.$report->report_id.'.html');
        File::ensureDirectoryExists(dirname($jsonPath));
        File::put($jsonPath, json_encode($report->fresh()->toArray(), JSON_PRETTY_PRINT));
        File::put($htmlPath, '<h1>ALAMAT Validation Report</h1><pre>'.e(json_encode($issues, JSON_PRETTY_PRINT)).'</pre>');
        $report->update(['json_report_path' => $jsonPath, 'html_report_path' => $htmlPath]);

        return $report->fresh()->toArray();
    }

    public function latest()
    {
        return ProductionValidationReport::query()->latest()->limit(20)->get();
    }

    private function validateJsonFile(string $path, array &$issues): void
    {
        try {
            $decoded = json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
        } catch (\Throwable $exception) {
            $issues[] = ['severity' => 'error', 'rule' => 'valid_json', 'path' => $path, 'message' => $exception->getMessage()];
            return;
        }

        if (is_array($decoded)) {
            $ids = [];
            $slugs = [];
            foreach ($decoded as $row) {
                if (! is_array($row)) {
                    continue;
                }
                $primaryKey = collect(array_keys($row))->first(fn ($key) => str_ends_with($key, '_id'));
                if ($primaryKey && is_string($row[$primaryKey] ?? null)) {
                    $ids[$row[$primaryKey]] = ($ids[$row[$primaryKey]] ?? 0) + 1;
                }
                if (isset($row['slug'])) {
                    $slugs[$row['slug']] = ($slugs[$row['slug']] ?? 0) + 1;
                }
            }
            foreach (array_filter($ids, fn ($count) => $count > 1) as $id => $count) {
                $issues[] = ['severity' => 'error', 'rule' => 'unique_ids', 'path' => $path, 'message' => "Duplicate id {$id} appears {$count} times."];
            }
            foreach (array_filter($slugs, fn ($count) => $count > 1) as $slug => $count) {
                $issues[] = ['severity' => 'error', 'rule' => 'unique_slugs', 'path' => $path, 'message' => "Duplicate slug {$slug} appears {$count} times."];
            }
        }
    }

    private function countJsonFiles(array $roots): int
    {
        return collect($roots)->sum(fn ($root) => File::isDirectory(base_path($root)) ? count(File::files(base_path($root))) : 0);
    }
}
