<?php

namespace App\Console\Commands;

use App\Models\Equipment;
use App\Services\EquipmentAssetPromptService;
use Illuminate\Console\Command;

class GenerateEquipmentAssetPrompts extends Command
{
    protected $signature = 'alamat:generate-equipment-asset-prompts {--only-active}';
    protected $description = 'Generate missing equipment asset prompts.';

    public function handle(EquipmentAssetPromptService $assets): int
    {
        $query = Equipment::query();
        if ($this->option('only-active')) {
            $query->where('is_active', true);
        }
        $count = 0;
        $query->chunkById(200, function ($rows) use ($assets, &$count): void {
            foreach ($rows as $equipment) {
                $fields = $assets->prompts($equipment->toArray());
                $equipment->fill([
                    'icon_filename' => $equipment->icon_filename ?: $fields['icon_filename'],
                    'sprite_filename' => $equipment->sprite_filename ?: $fields['sprite_filename'],
                    'thumbnail_filename' => $equipment->thumbnail_filename ?: $fields['thumbnail_filename'],
                    'asset_prompt' => $equipment->asset_prompt ?: $fields['asset_prompt'],
                    'icon_prompt' => $equipment->icon_prompt ?: $fields['icon_prompt'],
                    'design_notes' => $equipment->design_notes ?: $fields['design_notes'],
                ])->save();
                $count++;
            }
        });
        $this->info("Generated or verified prompts for {$count} equipment record(s).");
        return self::SUCCESS;
    }
}
