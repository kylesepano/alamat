<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Models\ProductionAsset;
use App\Models\ProductionBuildRun;
use App\Models\ProductionLocalizationString;
use App\Models\ProductionModPack;
use App\Models\ProductionQaReport;
use App\Models\ProductionValidationReport;
use App\Services\ProductionAssetPipelineService;
use App\Services\ProductionExportService;
use App\Services\ProductionImportPipelineService;
use App\Services\ProductionPlatformService;
use App\Services\ProductionValidationService;
use Illuminate\Http\Request;

class ProductionController extends Controller
{
    public function summary(ProductionPlatformService $platform, ProductionAssetPipelineService $assets): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            ...$platform->summary(),
            'asset_pipeline' => $assets->summary(),
        ]);
    }

    public function importStatus(ProductionImportPipelineService $pipeline): FoundationCollectionResource
    {
        return new FoundationCollectionResource($pipeline->latest());
    }

    public function runImport(Request $request, ProductionImportPipelineService $pipeline): FoundationCollectionResource
    {
        return new FoundationCollectionResource($pipeline->run(
            (string) $request->input('codex'),
            $request->boolean('dry_run', true),
            $request->input('options', [])
        ));
    }

    public function exportJobs(ProductionExportService $exports): FoundationCollectionResource
    {
        return new FoundationCollectionResource($exports->latest());
    }

    public function runExport(Request $request, ProductionExportService $exports): FoundationCollectionResource
    {
        return new FoundationCollectionResource($exports->export(
            (string) $request->input('codex'),
            (string) $request->input('format', 'json'),
            $request->input('filters', [])
        ));
    }

    public function validationReports(ProductionValidationService $validation): FoundationCollectionResource
    {
        return new FoundationCollectionResource($validation->latest());
    }

    public function runValidation(Request $request, ProductionValidationService $validation): FoundationCollectionResource
    {
        return new FoundationCollectionResource($validation->validate((string) $request->input('scope', 'all')));
    }

    public function assets(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(ProductionAsset::query()->latest()->limit(100)->get());
    }

    public function registerAsset(Request $request, ProductionAssetPipelineService $assets): FoundationCollectionResource
    {
        return new FoundationCollectionResource($assets->registerPlaceholder(
            (string) $request->input('asset_type'),
            (string) $request->input('owner_type'),
            (string) $request->input('owner_id'),
            (string) $request->input('filename'),
            $request->input('generation_prompt')
        ));
    }

    public function generatePrompt(Request $request, ProductionAssetPipelineService $assets): FoundationCollectionResource
    {
        return new FoundationCollectionResource($assets->generatePrompt(
            (string) $request->input('prompt_type'),
            (string) $request->input('owner_type'),
            (string) $request->input('owner_id'),
            $request->input('context', [])
        ));
    }

    public function localization(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(ProductionLocalizationString::query()->orderBy('translation_key')->limit(200)->get());
    }

    public function buildStatus(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(ProductionBuildRun::query()->latest()->limit(20)->get());
    }

    public function qaReports(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(ProductionQaReport::query()->latest()->limit(20)->get());
    }

    public function analyticsSummary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'events' => \App\Models\ProductionAnalyticsEvent::query()->where('opt_in', true)->count(),
            'by_type' => \App\Models\ProductionAnalyticsEvent::query()->where('opt_in', true)->selectRaw('event_type, count(*) as total')->groupBy('event_type')->pluck('total', 'event_type'),
        ]);
    }

    public function modPacks(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(ProductionModPack::query()->latest()->limit(50)->get());
    }

    public function developerCommand(Request $request, ProductionPlatformService $platform): FoundationCollectionResource
    {
        return new FoundationCollectionResource($platform->logDeveloperCommand((string) $request->input('command'), $request->input('payload', [])));
    }
}
