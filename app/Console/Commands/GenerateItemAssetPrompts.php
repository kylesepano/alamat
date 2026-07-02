<?php

namespace App\Console\Commands;

use App\Models\Item;
use App\Services\ItemAssetPromptService;
use Illuminate\Console\Command;

class GenerateItemAssetPrompts extends Command
{
    protected $signature = 'alamat:generate-item-asset-prompts {--only-active}';

    protected $description = 'Generate missing item asset filenames and prompts.';

    public function handle(ItemAssetPromptService $assets): int
    {
        $query = Item::query();
        if ($this->option('only-active')) {
            $query->where('is_active', true);
        }

        $count = 0;
        $query->chunkById(200, function ($items) use ($assets, &$count): void {
            foreach ($items as $item) {
                $fields = $assets->prompts($item->toArray());
                $item->fill([
                    'icon_filename' => $item->icon_filename ?: $fields['icon_filename'],
                    'sprite_filename' => $item->sprite_filename ?: $fields['sprite_filename'],
                    'thumbnail_filename' => $item->thumbnail_filename ?: $fields['thumbnail_filename'],
                    'asset_prompt' => $item->asset_prompt ?: $fields['asset_prompt'],
                    'icon_prompt' => $item->icon_prompt ?: $fields['icon_prompt'],
                    'design_notes' => $item->design_notes ?: $fields['design_notes'],
                ])->save();
                $count++;
            }
        });

        $this->info("Generated or verified prompts for {$count} item(s).");

        return self::SUCCESS;
    }
}
