<?php

namespace App\Services;

use App\Models\ItemRecipe;

class ItemRecipeService
{
    public function forOutputItem(string $itemId)
    {
        return ItemRecipe::query()
            ->with('outputItem')
            ->whereHas('outputItem', fn ($query) => $query->where('item_id', $itemId))
            ->get();
    }
}
