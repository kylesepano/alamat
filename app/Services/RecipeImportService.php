<?php

namespace App\Services;

use App\Models\BarterRule;
use App\Models\CraftingStation;
use App\Models\Currency;
use App\Models\EconomyAssetPrompt;
use App\Models\EconomyEvent;
use App\Models\Equipment;
use App\Models\FestivalMarket;
use App\Models\Item;
use App\Models\Location;
use App\Models\Npc;
use App\Models\NpcFaction;
use App\Models\Province;
use App\Models\Quest;
use App\Models\Recipe;
use App\Models\RecipeCategory;
use App\Models\RecipeIngredient;
use App\Models\RegionalPriceModifier;
use App\Models\Shop;
use App\Models\ShopInventory;
use App\Models\ShopType;
use App\Models\TradeRoute;
use App\Models\VendorProfile;
use App\Models\WorldRegion;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\ValidationException;

class RecipeImportService
{
    public const DATA_ROOT = 'database/data/economy';

    public function import(bool $dryRun = false): array
    {
        $summary = ['currencies' => 0, 'stations' => 0, 'recipe_categories' => 0, 'recipes_imported' => 0, 'recipes_updated' => 0, 'ingredients' => 0, 'shop_types' => 0, 'shops' => 0, 'shop_inventories' => 0, 'vendor_profiles' => 0, 'regional_modifiers' => 0, 'barter_rules' => 0, 'trade_routes' => 0, 'festival_markets' => 0, 'economy_events' => 0, 'asset_prompts' => 0, 'errors' => [], 'dry_run' => $dryRun];
        DB::beginTransaction();
        try {
            $summary['currencies'] = $this->lookupImport(Currency::class, 'currencies.json', 'currency_id');
            $summary['stations'] = $this->importStations();
            $summary['recipe_categories'] = $this->lookupImport(RecipeCategory::class, 'recipe_categories.json', 'category_id');

            foreach ($this->read('recipes.json') as $index => $row) {
                try {
                    $this->validateRecipe($row);
                    $recipe = Recipe::query()->updateOrCreate(['recipe_id' => $row['recipe_id']], $this->recipePayload($row));
                    $recipe->wasRecentlyCreated ? $summary['recipes_imported']++ : $summary['recipes_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $index + 1, 'recipe_id' => $row['recipe_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            $summary['ingredients'] = $this->importIngredients();
            $summary['shop_types'] = $this->lookupImport(ShopType::class, 'shop_types.json', 'shop_type_id');
            $summary['shops'] = $this->importShops();
            $summary['shop_inventories'] = $this->importShopInventories();
            $summary['vendor_profiles'] = $this->importNpcRows(VendorProfile::class, 'vendor_profiles.json', 'vendor_profile_id');
            $summary['regional_modifiers'] = $this->importRegionalModifiers();
            $summary['barter_rules'] = $this->importBarterRules();
            $summary['trade_routes'] = $this->importTradeRoutes();
            $summary['festival_markets'] = $this->importFestivalMarkets();
            $summary['economy_events'] = $this->importEconomyEvents();
            $summary['asset_prompts'] = $this->lookupImport(EconomyAssetPrompt::class, 'economy_asset_prompts.json', 'asset_prompt_id');

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    private function lookupImport(string $model, string $file, string $key): int
    {
        $rows = $this->read($file);
        foreach ($rows as $row) {
            $model::query()->updateOrCreate([$key => $row[$key]], $row);
        }
        return count($rows);
    }

    private function importStations(): int
    {
        $count = 0;
        foreach ($this->read('crafting_stations.json') as $row) {
            CraftingStation::query()->updateOrCreate(['station_id' => $row['station_id']], [
                ...collect($row)->except(['location_id', 'npc_id', 'required_quest_id'])->all(),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
                'npc_id' => $this->npcPk($row['npc_id'] ?? null),
                'required_quest_id' => $this->questPk($row['required_quest_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importIngredients(): int
    {
        $count = 0;
        foreach ($this->read('recipe_ingredients.json') as $row) {
            $recipeId = $this->recipePk($row['recipe_id'] ?? null);
            if (! $recipeId) {
                continue;
            }
            RecipeIngredient::query()->updateOrCreate(['ingredient_id' => $row['ingredient_id']], [
                ...collect($row)->except(['recipe_id', 'item_id', 'equipment_id'])->all(),
                'recipe_id' => $recipeId,
                'item_id' => $this->itemPk($row['item_id'] ?? null),
                'equipment_id' => $this->equipmentPk($row['equipment_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importShops(): int
    {
        $count = 0;
        foreach ($this->read('shops.json') as $row) {
            $this->validateShop($row);
            Shop::query()->updateOrCreate(['shop_id' => $row['shop_id']], [
                ...collect($row)->except(['npc_id', 'location_id', 'faction_id', 'currency_id'])->all(),
                'npc_id' => $this->npcPk($row['npc_id'] ?? null),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
                'faction_id' => $this->factionPk($row['faction_id'] ?? null),
                'currency_id' => Currency::query()->where('currency_id', $row['currency_id'])->orWhere('slug', $row['currency_id'])->value('id'),
            ]);
            $count++;
        }
        return $count;
    }

    private function importShopInventories(): int
    {
        $count = 0;
        foreach ($this->read('shop_inventories.json') as $row) {
            $shopId = Shop::query()->where('shop_id', $row['shop_id'])->value('id');
            if (! $shopId) {
                continue;
            }
            ShopInventory::query()->updateOrCreate(['shop_inventory_id' => $row['shop_inventory_id']], [
                ...collect($row)->except(['shop_id', 'item_id', 'equipment_id'])->all(),
                'shop_id' => $shopId,
                'item_id' => $this->itemPk($row['item_id'] ?? null),
                'equipment_id' => $this->equipmentPk($row['equipment_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importNpcRows(string $model, string $file, string $key): int
    {
        $count = 0;
        foreach ($this->read($file) as $row) {
            $model::query()->updateOrCreate([$key => $row[$key]], [...collect($row)->except(['npc_id'])->all(), 'npc_id' => $this->npcPk($row['npc_id'] ?? null)]);
            $count++;
        }
        return $count;
    }

    private function importRegionalModifiers(): int
    {
        $count = 0;
        foreach ($this->read('regional_price_modifiers.json') as $row) {
            RegionalPriceModifier::query()->updateOrCreate(['modifier_id' => $row['modifier_id']], [
                ...collect($row)->except(['region_id', 'province_id', 'location_id'])->all(),
                'region_id' => $this->regionPk($row['region_id'] ?? null),
                'province_id' => $this->provincePk($row['province_id'] ?? null),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importBarterRules(): int
    {
        $count = 0;
        foreach ($this->read('barter_rules.json') as $row) {
            BarterRule::query()->updateOrCreate(['barter_id' => $row['barter_id']], [
                ...collect($row)->except(['npc_id', 'faction_id'])->all(),
                'npc_id' => $this->npcPk($row['npc_id'] ?? null),
                'faction_id' => $this->factionPk($row['faction_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function importTradeRoutes(): int
    {
        $count = 0;
        foreach ($this->read('trade_routes.json') as $row) {
            if (blank($row['origin_location_id'] ?? null) || blank($row['destination_location_id'] ?? null)) {
                throw ValidationException::withMessages(['trade_route' => 'Trade routes require origin_location_id and destination_location_id.']);
            }
            TradeRoute::query()->updateOrCreate(['route_id' => $row['route_id']], [
                ...collect($row)->except(['origin_location_id', 'destination_location_id'])->all(),
                'origin_location_id' => $this->locationPk($row['origin_location_id']),
                'destination_location_id' => $this->locationPk($row['destination_location_id']),
            ]);
            $count++;
        }
        return $count;
    }

    private function importFestivalMarkets(): int
    {
        $count = 0;
        foreach ($this->read('festival_markets.json') as $row) {
            FestivalMarket::query()->updateOrCreate(['festival_market_id' => $row['festival_market_id']], [
                ...collect($row)->except(['location_id', 'currency_id'])->all(),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
                'currency_id' => Currency::query()->where('currency_id', $row['currency_id'] ?? null)->value('id'),
            ]);
            $count++;
        }
        return $count;
    }

    private function importEconomyEvents(): int
    {
        $count = 0;
        foreach ($this->read('economy_events.json') as $row) {
            EconomyEvent::query()->updateOrCreate(['economy_event_id' => $row['economy_event_id']], [
                ...collect($row)->except(['region_id', 'location_id'])->all(),
                'region_id' => $this->regionPk($row['region_id'] ?? null),
                'location_id' => $this->locationPk($row['location_id'] ?? null),
            ]);
            $count++;
        }
        return $count;
    }

    private function recipePayload(array $row): array
    {
        return [
            ...collect($row)->except(['output_item_id', 'output_equipment_id', 'required_station_id', 'required_npc_id', 'required_quest_id', 'required_location_id'])->all(),
            'output_item_id' => $this->itemPk($row['output_item_id'] ?? null),
            'output_equipment_id' => $this->equipmentPk($row['output_equipment_id'] ?? null),
            'required_station_id' => $this->stationPk($row['required_station_id'] ?? null),
            'required_npc_id' => $this->npcPk($row['required_npc_id'] ?? null),
            'required_quest_id' => $this->questPk($row['required_quest_id'] ?? null),
            'required_location_id' => $this->locationPk($row['required_location_id'] ?? null),
        ];
    }

    private function validateRecipe(array $row): void
    {
        foreach (['recipe_id', 'name', 'recipe_type', 'output_type', 'ingredients_payload'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Recipe field [{$field}] is required."]);
            }
        }
    }

    private function validateShop(array $row): void
    {
        foreach (['shop_id', 'name', 'shop_type', 'currency_id'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Shop field [{$field}] is required."]);
            }
        }
    }

    private function stationPk(?string $value): ?int { return blank($value) ? null : CraftingStation::query()->where('station_id', $value)->orWhere('slug', $value)->value('id'); }
    private function recipePk(?string $value): ?int { return blank($value) ? null : Recipe::query()->where('recipe_id', $value)->orWhere('slug', $value)->value('id'); }
    private function itemPk(?string $value): ?int { return blank($value) ? null : Item::query()->where('item_id', $value)->orWhere('slug', $value)->value('id'); }
    private function equipmentPk(?string $value): ?int { return blank($value) ? null : Equipment::query()->where('equipment_id', $value)->orWhere('slug', $value)->value('id'); }
    private function npcPk(?string $value): ?int { return blank($value) ? null : Npc::query()->where('npc_id', $value)->orWhere('slug', $value)->value('id'); }
    private function questPk(?string $value): ?int { return blank($value) ? null : Quest::query()->where('quest_id', $value)->orWhere('slug', $value)->value('id'); }
    private function locationPk(?string $value): ?int { return blank($value) ? null : Location::query()->where('location_id', $value)->orWhere('slug', $value)->value('id'); }
    private function factionPk(?string $value): ?int { return blank($value) ? null : NpcFaction::query()->where('faction_id', $value)->orWhere('slug', $value)->value('id'); }
    private function regionPk(?string $value): ?int { return blank($value) ? null : WorldRegion::query()->where('region_id', $value)->orWhere('slug', $value)->value('id'); }
    private function provincePk(?string $value): ?int { return blank($value) ? null : Province::query()->where('province_id', $value)->orWhere('slug', $value)->value('id'); }

    private function read(string $file): array
    {
        $path = base_path(self::DATA_ROOT.'/'.$file);
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("Economy data file [{$path}] not found.");
        }
        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
