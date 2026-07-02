<?php

namespace App\Services;

use Illuminate\Support\Str;

class ItemAssetPromptService
{
    public function filenames(string $itemId, string $slug): array
    {
        return [
            'icon_filename' => "icon_{$itemId}_{$slug}.png",
            'sprite_filename' => "item_{$itemId}_{$slug}.png",
            'thumbnail_filename' => "thumb_{$itemId}_{$slug}.png",
        ];
    }

    public function prompts(array $item): array
    {
        $slug = $item['slug'] ?? Str::slug($item['name']);
        $filenames = $this->filenames($item['item_id'], $slug);
        $category = str_replace('_', ' ', $item['item_type'] ?? 'item');
        $rarity = $item['rarity'] ?? 'Common';
        $visual = $item['visual_description'] ?? "Readable {$category} silhouette based on {$item['name']}.";
        $color = $item['color_mood'] ?? "{$rarity} palette with Filipino fantasy RPG material cues.";
        $cultural = $item['cultural_notes'] ?? 'Use respectful Filipino fantasy motifs such as woven fiber, brass, shell, bamboo, leaf wrapping, shrine candle, river stone, or harvest materials when appropriate.';

        return [
            ...$filenames,
            'asset_prompt' => $item['asset_prompt'] ?? "Create a clean 2D RPG item icon for ALAMAT, a Philippine mythology monster-collecting RPG.\n\nItem: {$item['name']}\nCategory: {$category}\nRarity: {$rarity}\nStyle: readable at 32x32 and 64x64, painterly but clean, Filipino fantasy RPG aesthetic, transparent background, no text, no UI, strong silhouette.\n\nVisual details:\n{$visual}\n\nColor/mood:\n{$color}\n\nCultural design notes:\n{$cultural}\n\nOutput should look like a game inventory icon.",
            'icon_prompt' => $item['icon_prompt'] ?? "Create a polished transparent-background RPG inventory icon for {$item['name']}. Category: {$category}. Rarity: {$rarity}. {$visual} No text, no UI frame, readable at small sizes.",
            'design_notes' => $item['design_notes'] ?? "{$visual} {$cultural}",
        ];
    }
}
