<?php

namespace App\Services;

use App\Models\Item;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ItemService
{
    public array $with = ['category', 'rarity', 'statusEffect', 'monster', 'outputRecipes', 'dropTables.monster'];

    public function query(Request $request): Builder
    {
        return Item::query()
            ->with($this->with)
            ->where('is_active', true)
            ->when($request->query('search'), function (Builder $query, string $search): void {
                $query->where(function (Builder $query) use ($search): void {
                    $query->where('name', 'like', "%{$search}%")
                        ->orWhere('item_id', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('lore', 'like', "%{$search}%");
                });
            })
            ->when($request->query('category'), fn (Builder $query, string $value) => $query->whereHas('category', fn (Builder $q) => $q->where('category_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('rarity'), fn (Builder $query, string $value) => $query->whereHas('rarity', fn (Builder $q) => $q->where('code', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('item_type'), fn (Builder $query, string $value) => $query->where('item_type', $value))
            ->when($request->query('region'), fn (Builder $query, string $value) => $query->where('region_origin', $value))
            ->when($request->boolean('usable_in_battle'), fn (Builder $query) => $query->where('usable_in_battle', true))
            ->when($request->boolean('usable_in_field'), fn (Builder $query) => $query->where('usable_in_field', true))
            ->when($request->boolean('usable_in_crafting'), fn (Builder $query) => $query->where('usable_in_crafting', true))
            ->when($request->query('monster_id'), fn (Builder $query, string $value) => $query->whereHas('monster', fn (Builder $q) => $q->where('monster_id', $value)))
            ->when($request->query('skill_id'), fn (Builder $query, string $value) => $query->where('skill_id', $value))
            ->when($request->query('quest_id'), fn (Builder $query, string $value) => $query->where('quest_id', $value));
    }
}
