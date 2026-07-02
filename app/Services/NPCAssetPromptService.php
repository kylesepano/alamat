<?php

namespace App\Services;

use Illuminate\Support\Str;

class NPCAssetPromptService
{
    public function prompts(array $npc): array
    {
        $slug = $npc['slug'] ?? Str::slug($npc['full_name'] ?? $npc['npc_id']);
        $npcId = $npc['npc_id'];
        $name = $npc['full_name'] ?? $npcId;
        $role = $npc['role_name'] ?? 'Resident';
        $region = $npc['region'] ?? 'Kapuluan';
        $profession = $npc['profession_name'] ?? 'Community Worker';

        return [
            'portrait_filename' => $npc['portrait_filename'] ?? "portrait_{$npcId}_{$slug}.png",
            'overworld_sprite' => $npc['overworld_sprite'] ?? "sprite_{$npcId}_{$slug}.png",
            'battle_sprite' => $npc['battle_sprite'] ?? null,
            'bust_filename' => "bust_{$npcId}_{$slug}.png",
            'emotion_sheet_filename' => "emotions_{$npcId}_{$slug}.png",
            'portrait_prompt' => "Create a detailed fantasy RPG portrait for ALAMAT.\n\nNPC Name: {$name}\nRole: {$role}\nRegion: {$region}\nProfession: {$profession}\n\nStyle:\nSemi-realistic painterly fantasy.\nFilipino-inspired clothing.\nRespect regional traditions.\nWarm natural colors.\nNo text.\nStrong facial expression.\nInclude profession tools.",
            'overworld_sprite_prompt' => "Create a top-down RPG sprite for {$name}. Readable at 32x32 and 64x64. Transparent background. Strong silhouette. Traditional Filipino fantasy clothing. Profession-specific accessories for {$profession}.",
            'battle_sprite_prompt' => ! empty($npc['battle_sprite']) ? "Create a combat-ready RPG battle sprite for {$name}, with readable silhouette and no text." : null,
            'bust_prompt' => "Create a bust illustration for {$name} suitable for ALAMAT dialogue UI.",
            'emotion_sheet_prompt' => "Generate emotion sheet prompts for {$name}: Happy, Sad, Angry, Thinking, Laughing, Shocked, Determined, Prayer, Celebration, Combat Ready.",
            'voice_description_prompt' => "Describe the voice for {$name}: type, accent, speaking speed, vocabulary, catchphrases, emotional range, battle callouts, and greeting style.",
            'design_notes' => 'Use fictional ALAMAT styling and avoid presenting any living tradition as costume-only decoration.',
        ];
    }
}
