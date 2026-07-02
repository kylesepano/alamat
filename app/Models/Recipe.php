<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Recipe extends Model
{
    protected $guarded = [];
    protected $casts = ['ingredients_payload' => 'array', 'is_active' => 'boolean'];
    public function ingredients(): HasMany { return $this->hasMany(RecipeIngredient::class, 'recipe_id'); }
    public function station(): BelongsTo { return $this->belongsTo(CraftingStation::class, 'required_station_id'); }
    public function outputItem(): BelongsTo { return $this->belongsTo(Item::class, 'output_item_id'); }
    public function outputEquipment(): BelongsTo { return $this->belongsTo(Equipment::class, 'output_equipment_id'); }
}
