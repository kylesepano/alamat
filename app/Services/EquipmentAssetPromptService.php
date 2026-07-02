<?php

namespace App\Services;

use Illuminate\Support\Str;

class EquipmentAssetPromptService
{
    public function filenames(string $equipmentId, string $slug): array
    {
        return [
            'icon_filename' => "icon_{$equipmentId}_{$slug}.png",
            'sprite_filename' => "equipment_{$equipmentId}_{$slug}.png",
            'thumbnail_filename' => "thumb_{$equipmentId}_{$slug}.png",
        ];
    }

    public function prompts(array $equipment): array
    {
        $slug = $equipment['slug'] ?? Str::slug($equipment['name']);
        $files = $this->filenames($equipment['equipment_id'], $slug);
        $visual = $equipment['visual_description'] ?? "Readable equipment silhouette for {$equipment['name']}.";
        $cultural = $equipment['cultural_notes'] ?? 'Use respectful Filipino fantasy motifs such as woven fiber, brass, shell, bamboo, rattan, leaf fiber, river stone, or ceremonial cloth when appropriate.';

        return [
            ...$files,
            'asset_prompt' => $equipment['asset_prompt'] ?? "Create a clean 2D RPG equipment icon for ALAMAT, a Philippine mythology monster-collecting RPG.\n\nEquipment: {$equipment['name']}\nSlot: {$equipment['slot_type']}\nCategory: {$equipment['category_id']}\nRarity: {$equipment['rarity']}\n\nStyle:\nReadable at 32x32 and 64x64.\nFilipino fantasy RPG aesthetic.\nTransparent background.\nNo text.\nNo UI.\nStrong silhouette.\n\nVisual details:\n{$visual}\n\nCultural design notes:\n{$cultural}\n\nOutput should look like a polished RPG inventory equipment icon.",
            'icon_prompt' => $equipment['icon_prompt'] ?? "Create a polished transparent-background RPG equipment icon for {$equipment['name']}. Slot: {$equipment['slot_type']}. Rarity: {$equipment['rarity']}. {$visual} No text, no UI, readable at 32x32.",
            'design_notes' => $equipment['design_notes'] ?? "{$visual} {$cultural}",
        ];
    }
}
