<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'equipment_id' => $this->equipment_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'category' => EquipmentCategoryResource::make($this->whenLoaded('category')),
            'slot_type' => $this->slot_type,
            'rarity' => LibraryEntryResource::make($this->whenLoaded('rarity')),
            'description' => $this->description,
            'lore' => $this->lore,
            'origin' => [
                'region' => $this->region_origin,
                'province' => $this->province_origin,
                'ethnolinguistic' => $this->ethnolinguistic_origin,
                'source_note' => $this->source_note,
            ],
            'stats' => collect(['hp', 'mana', 'faith', 'stamina', 'attack', 'magic', 'defense', 'spirit_defense', 'speed', 'luck'])->mapWithKeys(fn ($stat) => [$stat => $this->{"{$stat}_bonus"}]),
            'requirements' => [
                'level' => $this->required_level,
                'class' => $this->required_class,
                'affiliation' => $this->required_affiliation,
                'monster_id' => $this->whenLoaded('requiredMonster', fn () => $this->requiredMonster?->monster_id, $this->required_monster_id),
                'quest_id' => $this->required_quest_id,
            ],
            'flags' => [
                'usable_by_player' => $this->usable_by_player,
                'usable_by_monsters' => $this->usable_by_monsters,
                'usable_by_npcs' => $this->usable_by_npcs,
                'stackable' => $this->stackable,
                'sellable' => $this->sellable,
                'buyable' => $this->buyable,
            ],
            'economy' => ['base_price' => $this->base_price, 'sell_price' => $this->sell_price],
            'effects' => [
                'passive_id' => $this->passive_id,
                'skill_id' => $this->skill_id,
                'status_effect' => LibraryEntryResource::make($this->whenLoaded('statusEffect')),
                'effect_payload' => $this->effect_payload,
                'compatibility_payload' => $this->compatibility_payload,
            ],
            'assets' => [
                'icon_filename' => $this->icon_filename,
                'sprite_filename' => $this->sprite_filename,
                'thumbnail_filename' => $this->thumbnail_filename,
                'asset_prompt' => $this->asset_prompt,
                'icon_prompt' => $this->icon_prompt,
                'design_notes' => $this->design_notes,
            ],
            'upgrades' => EquipmentUpgradeResource::collection($this->whenLoaded('upgradePaths')),
            'sets' => EquipmentSetResource::collection($this->whenLoaded('sets')),
        ];
    }
}
