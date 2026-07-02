<?php

namespace App\Services;

use App\Models\Npc;
use App\Models\Shop;

class ShopService
{
    public function shop(Npc $npc): ?array
    {
        return $npc->loadMissing('shop.inventory')->shop?->toArray();
    }

    public function economyShops(): array
    {
        return Shop::query()->with(['currency', 'inventory', 'npc', 'location'])->where('is_active', true)->orderBy('name')->get()->toArray();
    }

    public function inventory(Shop $shop): array
    {
        return $shop->loadMissing('inventory')->inventory->toArray();
    }
}
