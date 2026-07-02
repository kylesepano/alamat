<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\EconomyLookupResource;
use App\Http\Resources\FoundationCollectionResource;
use App\Http\Resources\RecipeResource;
use App\Http\Resources\ShopResource;
use App\Models\CraftingStation;
use App\Models\Currency;
use App\Models\EconomyEvent;
use App\Models\FestivalMarket;
use App\Models\Recipe;
use App\Models\Shop;
use App\Models\TradeRoute;
use App\Services\BarterService;
use App\Services\CraftingService;
use Illuminate\Http\Request;

class EconomyController extends Controller
{
    public function currencies()
    {
        return EconomyLookupResource::collection(Currency::query()->where('is_active', true)->orderByDesc('is_primary')->orderBy('name')->get());
    }

    public function stations()
    {
        return EconomyLookupResource::collection(CraftingStation::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function recipes(Request $request)
    {
        return RecipeResource::collection(Recipe::query()->with(['station', 'ingredients'])->where('is_active', true)
            ->when($request->query('type'), fn ($query, $type) => $query->where('recipe_type', $type))
            ->when($request->query('search'), fn ($query, $search) => $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('recipe_id', 'like', "%{$search}%")))
            ->orderBy('name')->paginate((int) $request->query('per_page', 24)));
    }

    public function recipe(string $recipeId): RecipeResource
    {
        return RecipeResource::make(Recipe::query()->with(['station', 'ingredients'])->where('recipe_id', $recipeId)->orWhere('slug', $recipeId)->firstOrFail());
    }

    public function shops(Request $request)
    {
        return ShopResource::collection(Shop::query()->with(['currency', 'inventory', 'npc', 'location'])->where('is_active', true)
            ->when($request->query('type'), fn ($query, $type) => $query->where('shop_type', $type))
            ->when($request->query('search'), fn ($query, $search) => $query->where(fn ($q) => $q->where('name', 'like', "%{$search}%")->orWhere('shop_id', 'like', "%{$search}%")))
            ->orderBy('name')->paginate((int) $request->query('per_page', 24)));
    }

    public function shop(string $shopId): ShopResource
    {
        return ShopResource::make(Shop::query()->with(['currency', 'inventory', 'npc', 'location'])->where('shop_id', $shopId)->orWhere('slug', $shopId)->firstOrFail());
    }

    public function inventory(string $shopId): FoundationCollectionResource
    {
        $shop = Shop::query()->with('inventory')->where('shop_id', $shopId)->orWhere('slug', $shopId)->firstOrFail();
        return new FoundationCollectionResource($shop->inventory);
    }

    public function tradeRoutes()
    {
        return EconomyLookupResource::collection(TradeRoute::query()->orderBy('route_id')->get());
    }

    public function festivalMarkets()
    {
        return EconomyLookupResource::collection(FestivalMarket::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function events()
    {
        return EconomyLookupResource::collection(EconomyEvent::query()->where('is_active', true)->orderBy('name')->get());
    }

    public function craft(string $recipeId, CraftingService $crafting): FoundationCollectionResource
    {
        $recipe = Recipe::query()->where('recipe_id', $recipeId)->orWhere('slug', $recipeId)->firstOrFail();
        return new FoundationCollectionResource($crafting->craft($recipe));
    }

    public function buy(Request $request): FoundationCollectionResource
    {
        return new FoundationCollectionResource(['status' => 'simulated', 'action' => 'buy', 'payload' => $request->all()]);
    }

    public function sell(Request $request): FoundationCollectionResource
    {
        return new FoundationCollectionResource(['status' => 'simulated', 'action' => 'sell', 'payload' => $request->all()]);
    }

    public function barter(Request $request, BarterService $barter): FoundationCollectionResource
    {
        return new FoundationCollectionResource($barter->simulate($request->input('barter_id')));
    }

    public function summary(): FoundationCollectionResource
    {
        return new FoundationCollectionResource([
            'currencies' => Currency::query()->count(),
            'stations' => CraftingStation::query()->count(),
            'recipes' => Recipe::query()->count(),
            'shops' => Shop::query()->count(),
            'trade_routes' => TradeRoute::query()->count(),
            'festival_markets' => FestivalMarket::query()->count(),
            'events' => EconomyEvent::query()->count(),
            'by_recipe_type' => Recipe::query()->selectRaw('recipe_type, count(*) as total')->groupBy('recipe_type')->orderBy('recipe_type')->pluck('total', 'recipe_type'),
        ]);
    }
}
