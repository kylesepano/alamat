<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'recipe_id' => $this->recipe_id,
            'slug' => $this->slug,
            'name' => $this->name,
            'recipe_type' => $this->recipe_type,
            'category' => $this->category,
            'output_type' => $this->output_type,
            'output_quantity' => $this->output_quantity,
            'station' => EconomyLookupResource::make($this->whenLoaded('station')),
            'ingredients_payload' => $this->ingredients_payload,
            'success_rate' => $this->success_rate,
            'gold_cost' => $this->gold_cost,
            'time_cost' => $this->time_cost,
            'experience_reward' => $this->experience_reward,
            'description' => $this->description,
            'lore' => $this->lore,
            'icon_filename' => $this->icon_filename,
            'ingredients' => EconomyLookupResource::collection($this->whenLoaded('ingredients')),
        ];
    }
}
