<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonsterCommonSkillResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'skill_name' => $this->skill_name,
            'skill_slug' => $this->skill_slug,
            'category' => $this->whenLoaded('category', fn () => LibraryEntryResource::make($this->category)),
            'damage_type' => $this->whenLoaded('damageType', fn () => LibraryEntryResource::make($this->damageType)),
            'unlock_level' => $this->unlock_level,
            'notes' => $this->notes,
        ];
    }
}
