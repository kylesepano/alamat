<?php

namespace App\Services;

use App\Models\ProductionAsset;
use App\Models\ProductionPromptRecord;
use Illuminate\Support\Str;

class ProductionAssetPipelineService
{
    public function registerPlaceholder(string $assetType, string $ownerType, string $ownerId, string $filename, ?string $prompt = null): array
    {
        return ProductionAsset::query()->updateOrCreate(
            ['asset_id' => 'AST-'.Str::slug($ownerType.'-'.$ownerId.'-'.$assetType)],
            [
                'asset_type' => $assetType,
                'owner_type' => $ownerType,
                'owner_id' => $ownerId,
                'filename' => $filename,
                'version' => '1.0.0',
                'status' => 'placeholder',
                'generation_prompt' => $prompt,
                'approval_status' => 'pending',
                'creation_date' => now()->toDateString(),
                'last_modified' => now(),
                'metadata_payload' => ['source' => 'phase_l_pipeline'],
            ]
        )->toArray();
    }

    public function generatePrompt(string $promptType, string $ownerType, string $ownerId, array $context = []): array
    {
        $prompt = trim("ALAMAT Filipino fantasy RPG {$promptType} for {$ownerType} {$ownerId}. Clean production asset, respectful fictional cultural motifs, readable game silhouette, no text, no logo.");
        return ProductionPromptRecord::query()->updateOrCreate(
            ['prompt_id' => 'PRM-'.Str::slug($ownerType.'-'.$ownerId.'-'.$promptType)],
            [
                'prompt_type' => $promptType,
                'owner_type' => $ownerType,
                'owner_id' => $ownerId,
                'version' => $context['version'] ?? '1.0.0',
                'prompt' => $prompt,
                'negative_prompt' => 'No stereotypes, no real-world religious superiority, no gore, no brand marks.',
                'seed_key' => sha1($ownerType.'|'.$ownerId.'|'.$promptType),
                'parameters_payload' => $context,
            ]
        )->toArray();
    }

    public function summary(): array
    {
        return [
            'assets' => ProductionAsset::query()->count(),
            'prompts' => ProductionPromptRecord::query()->count(),
            'by_status' => ProductionAsset::query()->selectRaw('status, count(*) as total')->groupBy('status')->pluck('total', 'status'),
            'by_approval' => ProductionAsset::query()->selectRaw('approval_status, count(*) as total')->groupBy('approval_status')->pluck('total', 'approval_status'),
        ];
    }
}
