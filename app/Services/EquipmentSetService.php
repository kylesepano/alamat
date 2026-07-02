<?php

namespace App\Services;

use App\Models\EquipmentSet;

class EquipmentSetService
{
    public function all()
    {
        return EquipmentSet::query()->with('equipment.category', 'equipment.rarity')->orderBy('name')->get();
    }
}
