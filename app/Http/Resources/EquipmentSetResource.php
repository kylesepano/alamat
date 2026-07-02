<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentSetResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'set_id' => $this->set_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'set_bonus_payload' => $this->set_bonus_payload,
            'lore' => $this->lore,
            'icon' => $this->icon,
            'equipment' => EquipmentResource::collection($this->whenLoaded('equipment')),
        ];
    }
}
