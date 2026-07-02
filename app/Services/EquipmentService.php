<?php

namespace App\Services;

use App\Models\Equipment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class EquipmentService
{
    public array $with = ['category', 'rarity', 'requiredMonster', 'statusEffect', 'upgradePaths.upgradedEquipment', 'sets'];

    public function query(Request $request): Builder
    {
        return Equipment::query()
            ->with($this->with)
            ->where('is_active', true)
            ->when($request->query('search'), fn (Builder $query, string $search) => $query->where(fn (Builder $q) => $q->where('name', 'like', "%{$search}%")->orWhere('equipment_id', 'like', "%{$search}%")->orWhere('description', 'like', "%{$search}%")))
            ->when($request->query('category'), fn (Builder $query, string $value) => $query->whereHas('category', fn (Builder $q) => $q->where('category_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('slot'), fn (Builder $query, string $value) => $query->where('slot_type', $value))
            ->when($request->query('rarity'), fn (Builder $query, string $value) => $query->whereHas('rarity', fn (Builder $q) => $q->where('code', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('class'), fn (Builder $query, string $value) => $query->where('required_class', $value))
            ->when($request->query('affiliation'), fn (Builder $query, string $value) => $query->where('required_affiliation', $value))
            ->when($request->boolean('usable_by_player'), fn (Builder $query) => $query->where('usable_by_player', true))
            ->when($request->boolean('usable_by_monsters'), fn (Builder $query) => $query->where('usable_by_monsters', true))
            ->when($request->query('required_monster_id'), fn (Builder $query, string $value) => $query->whereHas('requiredMonster', fn (Builder $q) => $q->where('monster_id', $value)));
    }
}
