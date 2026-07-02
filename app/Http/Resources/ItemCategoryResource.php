<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemCategoryResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'category_id' => $this->category_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'parent_category_id' => $this->parent_category_id,
            'icon' => $this->icon,
            'color_hint' => $this->color_hint,
            'sort_order' => $this->sort_order,
            'is_active' => $this->is_active,
        ];
    }
}
