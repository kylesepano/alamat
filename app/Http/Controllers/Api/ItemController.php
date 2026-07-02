<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\ItemCategoryResource;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\ItemCategory;
use App\Services\ItemService;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function __construct(private readonly ItemService $items)
    {
    }

    public function index(Request $request)
    {
        return ItemResource::collection(
            $this->items->query($request)->orderBy('name')->paginate((int) $request->query('per_page', 24))
        );
    }

    public function show(string $itemId): ItemResource
    {
        return ItemResource::make(Item::query()->with($this->items->with)->where('item_id', $itemId)->firstOrFail());
    }

    public function showBySlug(string $slug): ItemResource
    {
        return ItemResource::make(Item::query()->with($this->items->with)->where('slug', $slug)->firstOrFail());
    }

    public function category(string $category, Request $request)
    {
        $request->merge(['category' => $category]);

        return $this->index($request);
    }

    public function search(Request $request)
    {
        return $this->index($request);
    }

    public function byType(string $type, Request $request)
    {
        $request->merge(['item_type' => $type]);

        return $this->index($request);
    }

    public function categories()
    {
        return ItemCategoryResource::collection(ItemCategory::query()->orderBy('sort_order')->get());
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'total' => Item::query()->count(),
            'active' => Item::query()->where('is_active', true)->count(),
            'categories' => ItemCategory::query()->count(),
            'asset_ready' => Item::query()->whereNotNull('asset_prompt')->whereNotNull('icon_prompt')->whereNotNull('icon_filename')->count(),
            'by_type' => Item::query()->selectRaw('item_type, count(*) as total')->groupBy('item_type')->orderBy('item_type')->pluck('total', 'item_type'),
        ]);
    }
}
