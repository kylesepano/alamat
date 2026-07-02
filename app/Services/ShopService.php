<?php

namespace App\Services;

use App\Models\Npc;

class ShopService
{
    public function shop(Npc $npc): ?array
    {
        return $npc->loadMissing('shop.inventory')->shop?->toArray();
    }
}
