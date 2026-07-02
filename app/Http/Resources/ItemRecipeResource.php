<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ItemRecipeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'recipe_id' => $this->recipe_id,
            'output_quantity' => $this->output_quantity,
            'recipe_type' => $this->recipe_type,
            'required_station' => $this->required_station,
            'required_level' => $this->required_level,
            'required_quest_id' => $this->required_quest_id,
            'required_npc_id' => $this->required_npc_id,
            'required_weather' => $this->required_weather,
            'required_habitat' => $this->required_habitat,
            'ingredients' => $this->ingredients,
            'success_rate' => $this->success_rate,
            'gold_cost' => $this->gold_cost,
            'description' => $this->description,
        ];
    }
}
