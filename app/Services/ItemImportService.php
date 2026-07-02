<?php

namespace App\Services;

use App\Models\Item;
use App\Models\ItemCategory;
use App\Models\ItemRecipe;
use App\Models\LibraryRarityTier;
use App\Models\LibraryStatusEffect;
use App\Models\Monster;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ItemImportService
{
    public const DATA_ROOT = 'database/data/items';

    public function __construct(private readonly ItemAssetPromptService $assets)
    {
    }

    public function import(?string $file = null, bool $dryRun = false, bool $generatePrompts = true): array
    {
        $summary = ['categories' => 0, 'items_imported' => 0, 'items_updated' => 0, 'recipes_imported' => 0, 'recipes_updated' => 0, 'warnings' => [], 'errors' => [], 'dry_run' => $dryRun];

        DB::beginTransaction();

        try {
            $summary['categories'] = $this->importCategories();
            $items = $this->readJson($file ? base_path(self::DATA_ROOT.'/'.$file) : base_path(self::DATA_ROOT.'/items.json'));

            foreach ($items as $rowNumber => $row) {
                try {
                    $this->validateItem($row);
                    $payload = $this->itemPayload($row, $generatePrompts);
                    $item = Item::query()->updateOrCreate(['item_id' => $row['item_id']], $payload);
                    $item->wasRecentlyCreated ? $summary['items_imported']++ : $summary['items_updated']++;
                } catch (\Throwable $exception) {
                    $summary['errors'][] = ['row' => $rowNumber + 1, 'item_id' => $row['item_id'] ?? null, 'reason' => $exception->getMessage()];
                }
            }

            foreach ($this->readJson(base_path(self::DATA_ROOT.'/item_recipes.json')) as $recipe) {
                $output = Item::query()->where('item_id', $recipe['output_item_id'])->first();
                if (! $output) {
                    $summary['warnings'][] = "Recipe {$recipe['recipe_id']} skipped; output item not found.";
                    continue;
                }

                $model = ItemRecipe::query()->updateOrCreate(
                    ['recipe_id' => $recipe['recipe_id']],
                    [
                        'output_item_id' => $output->id,
                        'output_quantity' => $recipe['output_quantity'],
                        'recipe_type' => $recipe['recipe_type'],
                        'required_station' => $recipe['required_station'] ?? null,
                        'required_level' => $recipe['required_level'] ?? null,
                        'required_quest_id' => $recipe['required_quest_id'] ?? null,
                        'required_npc_id' => $recipe['required_npc_id'] ?? null,
                        'required_weather' => $recipe['required_weather'] ?? null,
                        'required_habitat' => $recipe['required_habitat'] ?? null,
                        'ingredients' => $recipe['ingredients'],
                        'success_rate' => $recipe['success_rate'] ?? 1,
                        'gold_cost' => $recipe['gold_cost'] ?? 0,
                        'description' => $recipe['description'],
                    ],
                );
                $model->wasRecentlyCreated ? $summary['recipes_imported']++ : $summary['recipes_updated']++;
            }

            $dryRun ? DB::rollBack() : DB::commit();
        } catch (\Throwable $exception) {
            DB::rollBack();
            throw $exception;
        }

        return $summary;
    }

    public function validateAll(): array
    {
        return $this->import(dryRun: true);
    }

    public function export(): array
    {
        return Item::query()->with(['category', 'rarity'])->orderBy('item_id')->get()->toArray();
    }

    private function importCategories(): int
    {
        $categories = $this->readJson(base_path(self::DATA_ROOT.'/item_categories.json'));
        $modelsByCategoryId = [];

        foreach ($categories as $category) {
            $parentId = null;
            if (! blank($category['parent_category_id'] ?? null)) {
                $parentId = $modelsByCategoryId[$category['parent_category_id']] ?? ItemCategory::query()->where('category_id', $category['parent_category_id'])->value('id');
            }

            $model = ItemCategory::query()->updateOrCreate(
                ['category_id' => $category['category_id']],
                [
                    'name' => $category['name'],
                    'slug' => $category['slug'],
                    'description' => $category['description'],
                    'parent_category_id' => $parentId,
                    'icon' => $category['icon'],
                    'color_hint' => $category['color_hint'],
                    'sort_order' => $category['sort_order'],
                    'is_active' => $category['is_active'] ?? true,
                ],
            );
            $modelsByCategoryId[$category['category_id']] = $model->id;
        }

        return count($categories);
    }

    private function itemPayload(array $row, bool $generatePrompts): array
    {
        $category = ItemCategory::query()->where('category_id', $row['category_id'])->orWhere('slug', $row['category_id'])->firstOrFail();
        $rarity = $this->resolveRarity($row['rarity']);
        $assetFields = $generatePrompts ? $this->assets->prompts($row) : [];

        return [
            'name' => $row['name'],
            'slug' => $row['slug'] ?? Str::slug($row['name']),
            'category_id' => $category->id,
            'item_type' => $row['item_type'],
            'rarity_id' => $rarity->id,
            'description' => $row['description'],
            'lore' => $row['lore'],
            'region_origin' => $row['region_origin'] ?? null,
            'province_origin' => $row['province_origin'] ?? null,
            'ethnolinguistic_origin' => $row['ethnolinguistic_origin'] ?? null,
            'source_note' => $row['source_note'] ?? null,
            'stackable' => $row['stackable'] ?? true,
            'max_stack' => $row['max_stack'] ?? 99,
            'sellable' => $row['sellable'] ?? true,
            'buyable' => $row['buyable'] ?? false,
            'base_price' => $row['base_price'] ?? 0,
            'sell_price' => $row['sell_price'] ?? 0,
            'weight' => $row['weight'] ?? null,
            'usable_in_battle' => $row['usable_in_battle'] ?? false,
            'usable_in_field' => $row['usable_in_field'] ?? false,
            'usable_in_crafting' => $row['usable_in_crafting'] ?? false,
            'usable_in_quests' => $row['usable_in_quests'] ?? false,
            'consumable' => $row['consumable'] ?? false,
            'cooldown' => $row['cooldown'] ?? null,
            'effect_summary' => $row['effect_summary'] ?? null,
            'effect_payload' => $row['effect_payload'] ?? null,
            'status_effect_id' => $this->resolveStatusEffectId($row['status_effect_id'] ?? null),
            'skill_id' => $row['skill_id'] ?? null,
            'monster_id' => $this->resolveMonsterId($row['monster_id'] ?? null),
            'quest_id' => $row['quest_id'] ?? null,
            'offering_affinity' => $row['offering_affinity'] ?? null,
            'habitat_affinity' => $row['habitat_affinity'] ?? null,
            'weather_affinity' => $row['weather_affinity'] ?? null,
            'time_affinity' => $row['time_affinity'] ?? null,
            'icon_filename' => $row['icon_filename'] ?? $assetFields['icon_filename'],
            'sprite_filename' => $row['sprite_filename'] ?? $assetFields['sprite_filename'],
            'thumbnail_filename' => $row['thumbnail_filename'] ?? $assetFields['thumbnail_filename'],
            'asset_prompt' => $row['asset_prompt'] ?? $assetFields['asset_prompt'],
            'icon_prompt' => $row['icon_prompt'] ?? $assetFields['icon_prompt'],
            'design_notes' => $row['design_notes'] ?? $assetFields['design_notes'],
            'is_active' => $row['is_active'] ?? true,
        ];
    }

    private function validateItem(array $row): void
    {
        foreach (['item_id', 'name', 'slug', 'category_id', 'item_type', 'rarity', 'description', 'icon_filename', 'asset_prompt', 'icon_prompt'] as $field) {
            if (blank($row[$field] ?? null)) {
                throw ValidationException::withMessages([$field => "Item field [{$field}] is required."]);
            }
        }

        if ($row['item_type'] === 'consumable' && blank($row['effect_payload'] ?? null)) {
            throw ValidationException::withMessages(['effect_payload' => 'Consumables require effect_payload.']);
        }

        if ($row['item_type'] === 'crafting_material' && ! ($row['usable_in_crafting'] ?? false)) {
            throw ValidationException::withMessages(['usable_in_crafting' => 'Crafting materials must be usable in crafting.']);
        }

        if ($row['item_type'] === 'quest_item' && (! ($row['usable_in_quests'] ?? false) || ($row['sellable'] ?? true))) {
            throw ValidationException::withMessages(['quest_item' => 'Quest items must be quest-usable and not sellable.']);
        }

        if ($row['item_type'] === 'offering' && blank($row['offering_affinity'] ?? null) && blank($row['habitat_affinity'] ?? null) && blank($row['monster_id'] ?? null)) {
            throw ValidationException::withMessages(['offering' => 'Offerings need an offering, habitat, or monster affinity.']);
        }

        if ($row['item_type'] === 'monster_drop' && blank($row['monster_id'] ?? null) && blank($row['source_note'] ?? null)) {
            throw ValidationException::withMessages(['monster_drop' => 'Monster drops need monster_id or source_note.']);
        }
    }

    private function resolveRarity(string $value): LibraryRarityTier
    {
        return LibraryRarityTier::query()
            ->where('code', $value)
            ->orWhere('slug', Str::slug($value))
            ->orWhere('name', $value)
            ->firstOrFail();
    }

    private function resolveStatusEffectId(?string $value): ?int
    {
        if (blank($value)) {
            return null;
        }

        return LibraryStatusEffect::query()->where('code', $value)->orWhere('slug', Str::slug($value))->orWhere('name', $value)->value('id');
    }

    private function resolveMonsterId(?string $value): ?int
    {
        if (blank($value)) {
            return null;
        }

        return Monster::query()->where('monster_id', $value)->value('id');
    }

    private function readJson(string $path): array
    {
        if (! File::exists($path)) {
            throw new \InvalidArgumentException("Item data file [{$path}] not found.");
        }

        return json_decode(File::get($path), true, flags: JSON_THROW_ON_ERROR);
    }
}
