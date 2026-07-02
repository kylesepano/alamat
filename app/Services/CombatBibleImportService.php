<?php

namespace App\Services;

use App\Models\CombatBibleEntry;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CombatBibleImportService
{
    public const COMBAT_ROOT = 'database/combat';

    public function manifest(): array
    {
        return $this->readJson(base_path(self::COMBAT_ROOT.'/manifest.json'));
    }

    public function audit(): array
    {
        $manifest = $this->manifest();
        $results = [];

        foreach ($manifest['modules'] ?? [] as $module) {
            $schemaPath = base_path(self::COMBAT_ROOT.'/'.$module['path']);
            $examplePath = base_path(self::COMBAT_ROOT.'/examples/'.$module['path']);
            $schema = is_file($schemaPath) ? $this->readJson($schemaPath) : null;
            $examples = is_file($examplePath) ? $this->readJson($examplePath) : null;

            $results[] = [
                'path' => $module['path'],
                'schema_exists' => is_file($schemaPath),
                'example_exists' => is_file($examplePath),
                'schema_valid' => $schema && ($schema['type'] ?? null) === 'array' && filled($schema['items']['properties'][$module['id_field']] ?? null),
                'example_count' => is_array($examples) ? count($examples) : 0,
                'errors' => $this->auditExampleRecords($module, $examples),
            ];
        }

        return [
            'modules' => $results,
            'total_modules' => count($results),
            'failed_modules' => collect($results)->filter(fn (array $row): bool => ! $row['schema_exists'] || ! $row['example_exists'] || ! $row['schema_valid'] || count($row['errors']) > 0)->count(),
        ];
    }

    public function importExamples(bool $dryRun = true): array
    {
        $summary = ['imported' => 0, 'updated' => 0, 'dry_run' => $dryRun];

        foreach ($this->manifest()['modules'] ?? [] as $module) {
            $examples = $this->readJson(base_path(self::COMBAT_ROOT.'/examples/'.$module['path']));

            foreach ($examples as $record) {
                $this->validateRecord($module, $record);

                if ($dryRun) {
                    continue;
                }

                $entry = CombatBibleEntry::query()->updateOrCreate(
                    [
                        'module' => $module['module'],
                        'category' => $module['category'],
                        'entry_id' => $record[$module['id_field']],
                    ],
                    [
                        'uuid' => $record['uuid'],
                        'slug' => $record['slug'],
                        'name' => $record['name'] ?? null,
                        'version' => $record['version'],
                        'source' => $record['source'],
                        'notes' => $record['notes'] ?? null,
                        'payload' => $record,
                        'is_active' => true,
                    ],
                );

                $entry->wasRecentlyCreated ? $summary['imported']++ : $summary['updated']++;
            }
        }

        return $summary;
    }

    public function validateRecord(array $module, array $record): void
    {
        $required = ['id', 'uuid', 'slug', 'created_at', 'updated_at', 'version', 'source', 'notes', $module['id_field']];

        foreach ($required as $field) {
            if (blank($record[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Combat Bible field [{$field}] is required for {$module['path']}."]);
            }
        }

        if (! Str::isUuid($record['uuid'])) {
            throw ValidationException::withMessages(['uuid' => 'Combat Bible uuid must be a valid UUID.']);
        }

        if (! preg_match('/^\d+\.\d+\.\d+$/', (string) $record['version'])) {
            throw ValidationException::withMessages(['version' => 'Combat Bible version must use semantic version format.']);
        }
    }

    private function auditExampleRecords(array $module, mixed $examples): array
    {
        if (! is_array($examples)) {
            return ['Example file must contain an array.'];
        }

        $errors = [];

        foreach ($examples as $index => $record) {
            try {
                $this->validateRecord($module, $record);
            } catch (\Throwable $exception) {
                $errors[] = 'Example '.($index + 1).': '.$exception->getMessage();
            }
        }

        return $errors;
    }

    private function readJson(string $path): array
    {
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("Combat Bible file [{$path}] does not exist.");
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
