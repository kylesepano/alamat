<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MonsterDropTableResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'monster_id' => $this->whenLoaded('monster', fn () => $this->monster?->monster_id, $this->monster_id),
            'item_id' => $this->whenLoaded('item', fn () => $this->item?->item_id, $this->item_id),
            'drop_rate' => $this->drop_rate,
            'min_quantity' => $this->min_quantity,
            'max_quantity' => $this->max_quantity,
            'condition' => $this->condition,
            'rarity_modifier' => $this->rarity_modifier,
            'weather_modifier' => $this->weather_modifier,
            'habitat_modifier' => $this->habitat_modifier,
            'is_guaranteed' => $this->is_guaranteed,
        ];
    }
}
