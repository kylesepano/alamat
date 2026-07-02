<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\NpcLookupResource;
use App\Http\Resources\NpcResource;
use App\Models\Npc;
use App\Models\NpcAmbientTemplate;
use App\Models\NpcCategory;
use App\Models\NpcFaction;
use App\Models\NpcRole;
use App\Services\DialogueService;
use App\Services\NPCService;
use App\Services\ScheduleService;
use Illuminate\Http\Request;

class NPCController extends Controller
{
    public function __construct(private readonly NPCService $npcs)
    {
    }

    public function index(Request $request)
    {
        return NpcResource::collection($this->npcs->query($request)->orderBy('full_name')->paginate((int) $request->query('per_page', 24)));
    }

    public function show(string $npcId): NpcResource
    {
        return NpcResource::make(Npc::query()->with(NPCService::WITH)->where('npc_id', $npcId)->orWhere('slug', $npcId)->firstOrFail());
    }

    public function search(Request $request)
    {
        return $this->index($request);
    }

    public function region(string $region, Request $request)
    {
        $request->merge(['region' => $region]);
        return $this->index($request);
    }

    public function faction(string $faction, Request $request)
    {
        $request->merge(['faction' => $faction]);
        return $this->index($request);
    }

    public function role(string $role, Request $request)
    {
        $request->merge(['role' => $role]);
        return $this->index($request);
    }

    public function shopkeepers(Request $request)
    {
        $request->merge(['shopkeeper' => true]);
        return $this->index($request);
    }

    public function trainers(Request $request)
    {
        $request->merge(['trainer' => true]);
        return $this->index($request);
    }

    public function companions(Request $request)
    {
        $request->merge(['companion' => true]);
        return $this->index($request);
    }

    public function schedule(string $npcId, ScheduleService $schedules): FoundationCollectionResource
    {
        $npc = Npc::query()->where('npc_id', $npcId)->orWhere('slug', $npcId)->firstOrFail();
        return new FoundationCollectionResource($schedules->schedule($npc));
    }

    public function dialogue(string $npcId, DialogueService $dialogues): FoundationCollectionResource
    {
        $npc = Npc::query()->where('npc_id', $npcId)->orWhere('slug', $npcId)->firstOrFail();
        return new FoundationCollectionResource($dialogues->tree($npc));
    }

    public function categories()
    {
        return NpcLookupResource::collection(NpcCategory::query()->where('is_active', true)->orderBy('sort_order')->get());
    }

    public function roles()
    {
        return NpcLookupResource::collection(NpcRole::query()->where('is_active', true)->orderBy('sort_order')->get());
    }

    public function factions()
    {
        return NpcLookupResource::collection(NpcFaction::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function ambient(Request $request)
    {
        return NpcLookupResource::collection(NpcAmbientTemplate::query()->where('is_active', true)->when($request->query('region'), fn ($query, $region) => $query->where('region', $region))->orderBy('ambient_id')->paginate((int) $request->query('per_page', 24)));
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'total' => Npc::query()->count(),
            'active' => Npc::query()->where('is_active', true)->count(),
            'companions' => Npc::query()->where('recruitable', true)->count(),
            'shopkeepers' => Npc::query()->whereNotNull('shop_id')->count(),
            'trainers' => Npc::query()->whereNotNull('trainer_id')->count(),
            'asset_ready' => Npc::query()->whereHas('assetPrompts')->count(),
            'ambient_templates' => NpcAmbientTemplate::query()->count(),
            'by_region' => Npc::query()->selectRaw('region, count(*) as total')->groupBy('region')->orderBy('region')->pluck('total', 'region'),
        ]);
    }
}
