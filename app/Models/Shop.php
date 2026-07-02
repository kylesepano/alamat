<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shop extends Model
{
    protected $guarded = [];
    protected $casts = ['opening_hours_payload' => 'array', 'price_modifier_payload' => 'array', 'restock_rule_payload' => 'array', 'is_active' => 'boolean'];
    public function inventory(): HasMany { return $this->hasMany(ShopInventory::class, 'shop_id'); }
    public function currency(): BelongsTo { return $this->belongsTo(Currency::class, 'currency_id'); }
    public function npc(): BelongsTo { return $this->belongsTo(Npc::class, 'npc_id'); }
    public function location(): BelongsTo { return $this->belongsTo(Location::class, 'location_id'); }
}
