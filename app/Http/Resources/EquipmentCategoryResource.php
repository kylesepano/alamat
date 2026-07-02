<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'category_id' => $this->category_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'slot_type' => $this->slot_type,
            'icon' => $this->icon,
            'color_hint' => $this->color_hint,
            'sort_order' => $this->sort_order,
        ];
    }
}
