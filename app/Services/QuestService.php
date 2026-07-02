<?php

namespace App\Services;

use App\Models\Quest;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class QuestService
{
    public const WITH = ['category', 'location', 'startingNpc', 'endingNpc', 'relatedMonster', 'relatedFaction', 'requiredQuest', 'steps', 'objectives', 'rewards', 'requirements', 'dialogues', 'flags', 'branches', 'markers', 'assetPrompts'];

    public function query(Request $request): Builder
    {
        return Quest::query()
            ->with(self::WITH)
            ->where('is_active', true)
            ->when($request->query('search'), fn (Builder $query, string $search) => $query->where(fn (Builder $q) => $q->where('title', 'like', "%{$search}%")->orWhere('quest_id', 'like', "%{$search}%")->orWhere('short_description', 'like', "%{$search}%")))
            ->when($request->query('category'), fn (Builder $query, string $value) => $query->whereHas('category', fn (Builder $q) => $q->where('category_id', $value)->orWhere('slug', $value)->orWhere('name', $value)))
            ->when($request->query('type'), fn (Builder $query, string $value) => $query->where('quest_type', $value))
            ->when($request->query('region'), fn (Builder $query, string $value) => $query->where('region', $value))
            ->when($request->boolean('hidden'), fn (Builder $query) => $query->where('hidden', true));
    }
}
