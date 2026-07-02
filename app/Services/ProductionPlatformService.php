<?php

namespace App\Services;

use App\Models\ProductionAnalyticsEvent;
use App\Models\ProductionBuildRun;
use App\Models\ProductionConsoleLog;
use App\Models\ProductionImportJob;
use App\Models\ProductionLocalizationString;
use App\Models\ProductionModPack;
use App\Models\ProductionQaReport;
use App\Models\ProductionSaveVersion;
use Illuminate\Support\Str;

class ProductionPlatformService
{
    public function summary(): array
    {
        return [
            'imports' => ProductionImportJob::query()->count(),
            'builds' => ProductionBuildRun::query()->count(),
            'qa_reports' => ProductionQaReport::query()->count(),
            'localization_strings' => ProductionLocalizationString::query()->count(),
            'save_versions' => ProductionSaveVersion::query()->count(),
            'analytics_events' => ProductionAnalyticsEvent::query()->where('opt_in', true)->count(),
            'mod_packs' => ProductionModPack::query()->count(),
            'console_commands' => ProductionConsoleLog::query()->count(),
        ];
    }

    public function seedDefaults(): void
    {
        ProductionSaveVersion::query()->updateOrCreate(['save_version' => '1.0.0'], [
            'schema_payload' => [
                'story_progress' => [], 'quests' => [], 'inventory' => [], 'equipment' => [],
                'monster_collection' => [], 'monster_trust' => [], 'npc_relationships' => [],
                'world_state' => [], 'faction_reputation' => [], 'settings' => [],
            ],
            'migration_payload' => ['from' => null, 'strategy' => 'base_version'],
            'is_current' => true,
        ]);
    }

    public function logDeveloperCommand(string $command, array $payload = []): array
    {
        abort_unless(app()->environment(['local', 'development', 'testing']), 403, 'Developer console is restricted to development builds.');

        return ProductionConsoleLog::query()->create([
            'command_id' => 'DEV-'.Str::upper(Str::random(10)),
            'command' => $command,
            'payload' => $payload,
            'environment' => app()->environment(),
            'status' => 'simulated',
            'executed_at' => now(),
        ])->toArray();
    }
}
