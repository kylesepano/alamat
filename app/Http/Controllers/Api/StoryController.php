<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Models\CharacterRelationship;
use App\Models\DialogueFlag;
use App\Models\EndingRoute;
use App\Models\FolkTale;
use App\Models\HistoricalEvent;
use App\Models\LoreBook;
use App\Models\MythologyEntry;
use App\Models\Poem;
use App\Models\Song;
use App\Models\StoryAct;
use App\Models\StoryAssetPrompt;
use App\Models\StoryChapter;
use App\Models\StoryDialogue;
use App\Models\StoryScene;
use App\Models\TimelineEntry;
use App\Models\WorldHistoryEntry;
use App\Services\EndingService;
use App\Services\LoreService;
use App\Services\RelationshipGraphService;
use App\Services\StoryService;
use App\Services\TimelineService;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function acts(StoryService $story): FoundationCollectionResource
    {
        return new FoundationCollectionResource($story->acts());
    }

    public function chapters(Request $request): FoundationCollectionResource
    {
        $chapters = StoryChapter::query()->with(['act', 'scenes'])
            ->when($request->query('act'), fn ($query, $act) => $query->whereHas('act', fn ($q) => $q->where('act_id', $act)->orWhere('slug', $act)))
            ->orderBy('chapter_number')
            ->get();

        return new FoundationCollectionResource($chapters);
    }

    public function scenes(Request $request): FoundationCollectionResource
    {
        $scenes = StoryScene::query()->with(['chapter.act', 'dialogues.choices'])
            ->when($request->query('chapter'), fn ($query, $chapter) => $query->whereHas('chapter', fn ($q) => $q->where('chapter_id', $chapter)->orWhere('slug', $chapter)))
            ->when($request->query('type'), fn ($query, $type) => $query->where('scene_type', $type))
            ->orderBy('chapter_id')
            ->orderBy('scene_order')
            ->get();

        return new FoundationCollectionResource($scenes);
    }

    public function dialogues(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(StoryDialogue::query()->with(['scene.chapter', 'choices'])->orderBy('dialogue_id')->get());
    }

    public function timeline(TimelineService $timeline): FoundationCollectionResource
    {
        return new FoundationCollectionResource($timeline->entries());
    }

    public function lore(LoreService $lore): FoundationCollectionResource
    {
        return new FoundationCollectionResource($lore->library());
    }

    public function endings(EndingService $endings): FoundationCollectionResource
    {
        return new FoundationCollectionResource($endings->routes());
    }

    public function mythology(): FoundationCollectionResource
    {
        return new FoundationCollectionResource(MythologyEntry::query()->orderBy('sort_order')->get());
    }

    public function relationships(RelationshipGraphService $graph): FoundationCollectionResource
    {
        return new FoundationCollectionResource($graph->graph());
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'acts' => StoryAct::query()->count(),
            'chapters' => StoryChapter::query()->count(),
            'scenes' => StoryScene::query()->count(),
            'dialogues' => StoryDialogue::query()->count(),
            'dialogue_flags' => DialogueFlag::query()->count(),
            'lore_books' => LoreBook::query()->count(),
            'folk_tales' => FolkTale::query()->count(),
            'songs' => Song::query()->count(),
            'poems' => Poem::query()->count(),
            'timeline_entries' => TimelineEntry::query()->count(),
            'historical_events' => HistoricalEvent::query()->count(),
            'world_history_entries' => WorldHistoryEntry::query()->count(),
            'mythology_entries' => MythologyEntry::query()->count(),
            'relationships' => CharacterRelationship::query()->count(),
            'ending_routes' => EndingRoute::query()->count(),
            'asset_prompts' => StoryAssetPrompt::query()->count(),
            'by_scene_type' => StoryScene::query()->selectRaw('scene_type, count(*) as total')->groupBy('scene_type')->orderBy('scene_type')->pluck('total', 'scene_type'),
        ]);
    }
}
