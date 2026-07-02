<?php

namespace App\Services;

use App\Models\EquipmentUpgradePath;

class EquipmentUpgradeService
{
    public function forEquipment(string $equipmentId)
    {
        return EquipmentUpgradePath::query()
            ->with(['baseEquipment', 'upgradedEquipment'])
            ->whereHas('baseEquipment', fn ($query) => $query->where('equipment_id', $equipmentId))
            ->get();
    }
}
