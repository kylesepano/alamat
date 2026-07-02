<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonsterUniqueSkillResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'skill_name' => $this->skill_name,
            'skill_slug' => $this->skill_slug,
            'description' => $this->description,
            'lore' => $this->lore,
            'category' => $this->whenLoaded('category', fn () => LibraryEntryResource::make($this->category)),
            'damage_type' => $this->whenLoaded('damageType', fn () => LibraryEntryResource::make($this->damageType)),
            'target_type' => $this->whenLoaded('targetType', fn () => LibraryEntryResource::make($this->targetType)),
            'power' => $this->power,
            'accuracy' => $this->accuracy,
            'mana_cost' => $this->mana_cost,
            'faith_cost' => $this->faith_cost,
            'cooldown' => $this->cooldown,
            'status_effect' => $this->whenLoaded('statusEffect', fn () => LibraryEntryResource::make($this->statusEffect)),
            'animation_prompt' => $this->animation_prompt,
            'icon_prompt' => $this->icon_prompt,
            'sound_effect' => $this->sound_effect,
            'sort_order' => $this->sort_order,
        ];
    }
}
