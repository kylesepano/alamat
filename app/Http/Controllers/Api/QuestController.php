<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\QuestLookupResource;
use App\Http\Resources\QuestResource;
use App\Models\Quest;
use App\Models\QuestCategory;
use App\Models\QuestChain;
use App\Models\QuestPlayerProgress;
use App\Services\QuestProgressService;
use App\Services\QuestService;
use Illuminate\Http\Request;

class QuestController extends Controller
{
    public function __construct(private readonly QuestService $quests)
    {
    }

    public function index(Request $request)
    {
        return QuestResource::collection($this->quests->query($request)->orderBy('quest_id')->paginate((int) $request->query('per_page', 24)));
    }

    public function show(string $questId): QuestResource
    {
        return QuestResource::make(Quest::query()->with(QuestService::WITH)->where('quest_id', $questId)->firstOrFail());
    }

    public function showBySlug(string $slug): QuestResource
    {
        return QuestResource::make(Quest::query()->with(QuestService::WITH)->where('slug', $slug)->firstOrFail());
    }

    public function category(string $category, Request $request)
    {
        $request->merge(['category' => $category]);
        return $this->index($request);
    }

    public function type(string $type, Request $request)
    {
        $request->merge(['type' => $type]);
        return $this->index($request);
    }

    public function active()
    {
        return QuestLookupResource::collection(QuestPlayerProgress::query()->where('status', 'active')->with('quest')->get());
    }

    public function available(Request $request)
    {
        return $this->index($request);
    }

    public function completed()
    {
        return QuestLookupResource::collection(QuestPlayerProgress::query()->where('status', 'completed')->with('quest')->get());
    }

    public function chain(string $chainId): FoundationCollectionResource
    {
        $chain = QuestChain::query()->where('chain_id', $chainId)->orWhere('slug', $chainId)->firstOrFail();
        $quests = Quest::query()->with(QuestService::WITH)->whereIn('quest_id', collect($chain->quest_ids)->all())->get();
        return new FoundationCollectionResource(['chain' => $chain, 'quests' => QuestResource::collection($quests)]);
    }

    public function categories()
    {
        return QuestLookupResource::collection(QuestCategory::query()->where('is_active', true)->orderBy('sort_order')->get());
    }

    public function chains()
    {
        return QuestLookupResource::collection(QuestChain::query()->orderBy('name')->get());
    }

    public function start(string $questId, QuestProgressService $progress): FoundationCollectionResource
    {
        return new FoundationCollectionResource($progress->start($this->findQuest($questId)));
    }

    public function advance(string $questId, QuestProgressService $progress): FoundationCollectionResource
    {
        return new FoundationCollectionResource($progress->advance($this->findQuest($questId)));
    }

    public function complete(string $questId, QuestProgressService $progress): FoundationCollectionResource
    {
        return new FoundationCollectionResource($progress->complete($this->findQuest($questId)));
    }

    public function chooseBranch(string $questId, Request $request, QuestProgressService $progress): FoundationCollectionResource
    {
        return new FoundationCollectionResource($progress->chooseBranch($this->findQuest($questId), $request->input('branch_id', 'manual_choice')));
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'total' => Quest::query()->count(),
            'active' => Quest::query()->where('is_active', true)->count(),
            'hidden' => Quest::query()->where('hidden', true)->count(),
            'repeatable' => Quest::query()->where('repeatable', true)->count(),
            'time_limited' => Quest::query()->where('time_limited', true)->count(),
            'asset_ready' => Quest::query()->whereHas('assetPrompts')->count(),
            'by_type' => Quest::query()->selectRaw('quest_type, count(*) as total')->groupBy('quest_type')->orderBy('quest_type')->pluck('total', 'quest_type'),
        ]);
    }

    private function findQuest(string $questId): Quest
    {
        return Quest::query()->where('quest_id', $questId)->orWhere('slug', $questId)->firstOrFail();
    }
}
