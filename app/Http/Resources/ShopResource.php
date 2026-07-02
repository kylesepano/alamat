<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ShopResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'shop_id' => $this->shop_id,
            'name' => $this->name,
            'slug' => $this->slug,
            'shop_type' => $this->shop_type,
            'npc' => NpcLookupResource::make($this->whenLoaded('npc')),
            'location' => WorldLookupResource::make($this->whenLoaded('location')),
            'description' => $this->description,
            'opening_hours_payload' => $this->opening_hours_payload,
            'reputation_requirement' => $this->reputation_requirement,
            'relationship_requirement' => $this->relationship_requirement,
            'currency' => EconomyLookupResource::make($this->whenLoaded('currency')),
            'price_modifier_payload' => $this->price_modifier_payload,
            'restock_rule_payload' => $this->restock_rule_payload,
            'inventory' => EconomyLookupResource::collection($this->whenLoaded('inventory')),
        ];
    }
}
