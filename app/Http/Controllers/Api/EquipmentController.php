<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EquipmentCategoryResource;
use App\Http\Resources\EquipmentResource;
use App\Http\Resources\EquipmentSetResource;
use App\Http\Resources\FoundationCollectionResource;
use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Models\EquipmentSet;
use App\Services\EquipmentService;
use Illuminate\Http\Request;

class EquipmentController extends Controller
{
    public function __construct(private readonly EquipmentService $equipment)
    {
    }

    public function index(Request $request)
    {
        return EquipmentResource::collection($this->equipment->query($request)->orderBy('name')->paginate((int) $request->query('per_page', 24)));
    }

    public function categories()
    {
        return EquipmentCategoryResource::collection(EquipmentCategory::query()->where('is_active', true)->orderBy('sort_order')->get());
    }

    public function show(string $equipmentId): EquipmentResource
    {
        return EquipmentResource::make(Equipment::query()->with($this->equipment->with)->where('equipment_id', $equipmentId)->firstOrFail());
    }

    public function showBySlug(string $slug): EquipmentResource
    {
        return EquipmentResource::make(Equipment::query()->with($this->equipment->with)->where('slug', $slug)->firstOrFail());
    }

    public function category(string $category, Request $request)
    {
        $request->merge(['category' => $category]);
        return $this->index($request);
    }

    public function slot(string $slot, Request $request)
    {
        $request->merge(['slot' => $slot]);
        return $this->index($request);
    }

    public function sets()
    {
        return EquipmentSetResource::collection(EquipmentSet::query()->with('equipment.category', 'equipment.rarity')->orderBy('name')->get());
    }

    public function set(string $setId): EquipmentSetResource
    {
        return EquipmentSetResource::make(EquipmentSet::query()->with('equipment.category', 'equipment.rarity')->where('set_id', $setId)->orWhere('slug', $setId)->firstOrFail());
    }

    public function search(Request $request)
    {
        return $this->index($request);
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'total' => Equipment::query()->count(),
            'active' => Equipment::query()->where('is_active', true)->count(),
            'asset_ready' => Equipment::query()->whereNotNull('asset_prompt')->whereNotNull('icon_prompt')->whereNotNull('icon_filename')->count(),
            'sets' => EquipmentSet::query()->count(),
            'by_slot' => Equipment::query()->selectRaw('slot_type, count(*) as total')->groupBy('slot_type')->orderBy('slot_type')->pluck('total', 'slot_type'),
        ]);
    }
}
