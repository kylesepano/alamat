<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'item_id' => $this->item_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => ItemCategoryResource::make($this->whenLoaded('category')),
            'item_type' => $this->item_type,
            'rarity' => LibraryEntryResource::make($this->whenLoaded('rarity')),
            'description' => $this->description,
            'lore' => $this->lore,
            'origin' => [
                'region' => $this->region_origin,
                'province' => $this->province_origin,
                'ethnolinguistic' => $this->ethnolinguistic_origin,
                'source_note' => $this->source_note,
            ],
            'flags' => [
                'stackable' => $this->stackable,
                'max_stack' => $this->max_stack,
                'sellable' => $this->sellable,
                'buyable' => $this->buyable,
                'usable_in_battle' => $this->usable_in_battle,
                'usable_in_field' => $this->usable_in_field,
                'usable_in_crafting' => $this->usable_in_crafting,
                'usable_in_quests' => $this->usable_in_quests,
                'consumable' => $this->consumable,
            ],
            'economy' => [
                'base_price' => $this->base_price,
                'sell_price' => $this->sell_price,
                'weight' => $this->weight,
            ],
            'effect_summary' => $this->effect_summary,
            'effect_payload' => $this->effect_payload,
            'status_effect' => LibraryEntryResource::make($this->whenLoaded('statusEffect')),
            'skill_id' => $this->skill_id,
            'monster_id' => $this->whenLoaded('monster', fn () => $this->monster?->monster_id, $this->monster_id),
            'quest_id' => $this->quest_id,
            'affinities' => [
                'offering' => $this->offering_affinity,
                'habitat' => $this->habitat_affinity,
                'weather' => $this->weather_affinity,
                'time' => $this->time_affinity,
            ],
            'assets' => [
                'icon_filename' => $this->icon_filename,
                'sprite_filename' => $this->sprite_filename,
                'thumbnail_filename' => $this->thumbnail_filename,
                'asset_prompt' => $this->asset_prompt,
                'icon_prompt' => $this->icon_prompt,
                'design_notes' => $this->design_notes,
            ],
            'recipes' => ItemRecipeResource::collection($this->whenLoaded('outputRecipes')),
            'drop_sources' => MonsterDropTableResource::collection($this->whenLoaded('dropTables')),
            'is_active' => $this->is_active,
        ];
    }
}
