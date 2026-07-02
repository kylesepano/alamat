<?php

namespace App\Services;

use App\Models\Item;
use App\Models\Monster;
use App\Models\MonsterDropTable;

class DropTableService
{
    public function syncGeneratedDrops(): int
    {
        $count = 0;
        $items = Item::query()->where('item_type', 'monster_drop')->whereNotNull('monster_id')->get();

        foreach ($items as $item) {
            $monster = Monster::query()->find($item->monster_id);
            if (! $monster) {
                continue;
            }

            MonsterDropTable::query()->updateOrCreate(
                ['monster_id' => $monster->id, 'item_id' => $item->id, 'condition' => null],
                [
                    'drop_rate' => 0.15,
                    'min_quantity' => 1,
                    'max_quantity' => 2,
                    'rarity_modifier' => null,
                    'weather_modifier' => $item->weather_affinity,
                    'habitat_modifier' => $item->habitat_affinity,
                    'is_guaranteed' => false,
                ],
            );
            $count++;
        }

        return $count;
    }
}
