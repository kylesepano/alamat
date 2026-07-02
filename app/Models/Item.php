<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    protected $guarded = [];

    protected $casts = [
        'stackable' => 'boolean',
        'sellable' => 'boolean',
        'buyable' => 'boolean',
        'usable_in_battle' => 'boolean',
        'usable_in_field' => 'boolean',
        'usable_in_crafting' => 'boolean',
        'usable_in_quests' => 'boolean',
        'consumable' => 'boolean',
        'is_active' => 'boolean',
        'effect_payload' => 'array',
        'weight' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(ItemCategory::class, 'category_id');
    }

    public function rarity(): BelongsTo
    {
        return $this->belongsTo(LibraryRarityTier::class, 'rarity_id');
    }

    public function statusEffect(): BelongsTo
    {
        return $this->belongsTo(LibraryStatusEffect::class, 'status_effect_id');
    }

    public function monster(): BelongsTo
    {
        return $this->belongsTo(Monster::class, 'monster_id');
    }

    public function outputRecipes(): HasMany
    {
        return $this->hasMany(ItemRecipe::class, 'output_item_id');
    }

    public function dropTables(): HasMany
    {
        return $this->hasMany(MonsterDropTable::class, 'item_id');
    }
}
