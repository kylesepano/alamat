<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EquipmentUpgradeResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'upgrade_id' => $this->upgrade_id,
            'upgraded_equipment_id' => $this->whenLoaded('upgradedEquipment', fn () => $this->upgradedEquipment?->equipment_id, $this->upgraded_equipment_id),
            'upgrade_level' => $this->upgrade_level,
            'required_items' => $this->required_items,
            'required_gold' => $this->required_gold,
            'required_station' => $this->required_station,
            'required_quest_id' => $this->required_quest_id,
            'success_rate' => $this->success_rate,
            'description' => $this->description,
        ];
    }
}
