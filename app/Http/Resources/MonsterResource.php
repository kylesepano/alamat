<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonsterResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'monster_id' => $this->monster_id,
            'filipino_name' => $this->filipino_name,
            'english_name' => $this->english_name,
            'scientific_name' => $this->scientific_name,
            'nickname' => $this->nickname,
            'slug' => $this->slug,
            'region_of_origin' => $this->region_of_origin,
            'province_origin' => $this->province_origin,
            'ethnolinguistic_origin' => $this->ethnolinguistic_origin,
            'folklore_source_url' => $this->folklore_source_url,
            'mythological_category' => $this->mythological_category,
            'rarity' => $this->whenLoaded('rarity', fn () => LibraryEntryResource::make($this->rarity)),
            'nilalang_order' => $this->whenLoaded('nilalangOrder', fn () => LibraryEntryResource::make($this->nilalangOrder)),
            'combat_class' => $this->whenLoaded('combatClass', fn () => LibraryEntryResource::make($this->combatClass)),
            'temperament' => $this->whenLoaded('temperament', fn () => LibraryEntryResource::make($this->temperament)),
            'ai_behavior' => $this->whenLoaded('aiBehavior', fn () => LibraryEntryResource::make($this->aiBehavior)),
            'affiliations' => LibraryEntryResource::collection($this->whenLoaded('affiliations')),
            'personality_traits' => LibraryEntryResource::collection($this->whenLoaded('personalityTraits')),
            'habitats' => LibraryEntryResource::collection($this->whenLoaded('habitats')),
            'weather_types' => LibraryEntryResource::collection($this->whenLoaded('weatherTypes')),
            'active_times' => LibraryEntryResource::collection($this->whenLoaded('activeTimes')),
            'trust_method' => $this->whenLoaded('trustMethod', fn () => LibraryEntryResource::make($this->trustMethod)),
            'passive_ability' => $this->passive_ability,
            'stats' => [
                'hp' => $this->hp,
                'attack' => $this->attack,
                'magic' => $this->magic,
                'defense' => $this->defense,
                'spirit_defense' => $this->spirit_defense,
                'speed' => $this->speed,
                'luck' => $this->luck,
                'faith' => $this->faith,
                'trust_difficulty' => $this->capture_difficulty,
            ],
            'favorite_food_offering' => $this->favorite_food_offering,
            'folklore_summary' => $this->folklore_summary,
            'alamat_lore' => $this->alamat_lore,
            'lore_and_backstory' => $this->lore_and_backstory,
            'physical_description' => $this->physical_description,
            'personality_summary' => $this->personality_summary,
            'weaknesses' => $this->weaknesses,
            'resistances' => $this->resistances,
            'npc_related' => $this->npc_related,
            'quest_appearances' => $this->quest_appearances,
            'variants' => [
                'boss' => $this->boss_variant,
                'corrupted' => $this->corrupted_variant,
                'divine' => $this->divine_variant,
            ],
            'assets' => [
                'sprite_filename' => $this->sprite_filename,
                'battle_portrait_filename' => $this->battle_portrait_filename,
                'overworld_sprite_filename' => $this->overworld_sprite_filename,
                'sound_effects' => $this->sound_effects,
                'cry_voice_description' => $this->cry_voice_description,
            ],
            'drops' => $this->drop_items,
            'equipment_compatibility' => $this->equipment_compatibility,
            'asset_prompts' => [
                'sprite_prompt' => $this->sprite_prompt,
                'portrait_prompt' => $this->portrait_prompt,
                'battle_animation_prompt' => $this->battle_animation_prompt,
            ],
            'design_notes' => $this->design_notes,
            'is_recruitable' => $this->is_recruitable,
            'is_boss' => $this->is_boss,
            'is_active' => $this->is_active,
            'unique_skills' => MonsterUniqueSkillResource::collection($this->whenLoaded('uniqueSkills')),
            'common_skills' => MonsterCommonSkillResource::collection($this->whenLoaded('commonSkills')),
        ];
    }
}
