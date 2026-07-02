<?php

namespace App\Services;

use App\Models\Npc;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class NPCService
{
    public const WITH = ['category', 'role', 'profession', 'faction', 'personality', 'relationshipLevel', 'location', 'schedule', 'dialogue.conditions', 'service', 'shop.inventory', 'training', 'quests', 'portrait', 'voiceProfile', 'assetPrompts'];

    public function query(Request $request): Builder
    {
        return Npc::query()
            ->with(self::WITH)
            ->where('is_active', true)
            ->when($request->query('search'), fn (Builder $query, string $search) => $query->where(fn (Builder $q) => $q->where('full_name', 'like', "%{$search}%")->orWhere('npc_id', 'like', "%{$search}%")->orWhere('title', 'like', "%{$search}%")->orWhere('biography', 'like', "%{$search}%")))
            ->when($request->query('region'), fn (Builder $query, string $value) => $query->where('region', $value))
            ->when($request->query('faction'), fn (Builder $query, string $value) => $query->whereHas('faction', fn (Builder $q) => $q->where('faction_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('role'), fn (Builder $query, string $value) => $query->whereHas('role', fn (Builder $q) => $q->where('role_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('category'), fn (Builder $query, string $value) => $query->whereHas('category', fn (Builder $q) => $q->where('category_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->boolean('shopkeeper'), fn (Builder $query) => $query->whereNotNull('shop_id'))
            ->when($request->boolean('trainer'), fn (Builder $query) => $query->whereNotNull('trainer_id'))
            ->when($request->boolean('companion'), fn (Builder $query) => $query->where('recruitable', true));
    }
}
