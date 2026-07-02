<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('currency_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('symbol')->nullable();
            $table->text('description')->nullable();
            $table->string('icon_filename')->nullable();
            $table->boolean('is_primary')->default(false);
            $table->jsonb('exchange_rate_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('crafting_stations', function (Blueprint $table) {
            $table->id();
            $table->string('station_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('station_type')->index();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->text('description')->nullable();
            $table->foreignId('required_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->string('icon_filename')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('recipe_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('recipe_type')->index();
            $table->text('description')->nullable();
            $table->string('icon_hint')->nullable();
            $table->string('color_hint')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('recipe_id')->unique();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('recipe_type')->index();
            $table->string('category')->index();
            $table->string('output_type')->index();
            $table->foreignId('output_item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->foreignId('output_equipment_id')->nullable()->constrained('equipment')->nullOnDelete();
            $table->integer('output_quantity')->default(1);
            $table->foreignId('required_station_id')->nullable()->constrained('crafting_stations')->nullOnDelete();
            $table->integer('required_level')->nullable();
            $table->foreignId('required_npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('required_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->string('required_weather')->nullable();
            $table->foreignId('required_location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->jsonb('ingredients_payload');
            $table->decimal('success_rate', 5, 2)->default(1);
            $table->integer('gold_cost')->default(0);
            $table->integer('time_cost')->default(0);
            $table->integer('experience_reward')->default(0);
            $table->text('description')->nullable();
            $table->text('lore')->nullable();
            $table->string('icon_filename')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('recipe_ingredients', function (Blueprint $table) {
            $table->id();
            $table->string('ingredient_id')->unique();
            $table->foreignId('recipe_id')->constrained('recipes')->cascadeOnDelete();
            $table->string('ingredient_type')->index();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->nullOnDelete();
            $table->integer('quantity')->default(1);
            $table->boolean('consume_on_use')->default(true);
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('shop_types', function (Blueprint $table) {
            $table->id();
            $table->string('shop_type_id')->unique();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('shops', function (Blueprint $table) {
            $table->id();
            $table->string('shop_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('shop_type')->index();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->foreignId('faction_id')->nullable()->constrained('npc_factions')->nullOnDelete();
            $table->text('description')->nullable();
            $table->jsonb('opening_hours_payload')->nullable();
            $table->integer('reputation_requirement')->nullable();
            $table->string('relationship_requirement')->nullable();
            $table->foreignId('currency_id')->constrained('currencies')->cascadeOnDelete();
            $table->jsonb('price_modifier_payload')->nullable();
            $table->jsonb('restock_rule_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('shop_inventories', function (Blueprint $table) {
            $table->id();
            $table->string('shop_inventory_id')->unique();
            $table->foreignId('shop_id')->constrained('shops')->cascadeOnDelete();
            $table->string('inventory_type')->index();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->nullOnDelete();
            $table->string('skill_id')->nullable();
            $table->integer('quantity')->default(1);
            $table->integer('base_price')->default(0);
            $table->integer('stock_limit')->nullable();
            $table->string('restock_interval')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('vendor_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('vendor_profile_id')->unique();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->string('profile_name');
            $table->string('specialty')->nullable();
            $table->string('pricing_personality')->nullable();
            $table->integer('haggle_difficulty')->default(1);
            $table->jsonb('relationship_discount_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('regional_price_modifiers', function (Blueprint $table) {
            $table->id();
            $table->string('modifier_id')->unique();
            $table->foreignId('region_id')->nullable()->constrained('world_regions')->nullOnDelete();
            $table->foreignId('province_id')->nullable()->constrained('provinces')->nullOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->string('category')->index();
            $table->jsonb('modifier_payload');
            $table->text('reason')->nullable();
            $table->timestamps();
        });

        Schema::create('barter_rules', function (Blueprint $table) {
            $table->id();
            $table->string('barter_id')->unique();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('faction_id')->nullable()->constrained('npc_factions')->nullOnDelete();
            $table->jsonb('offered_payload');
            $table->jsonb('requested_payload');
            $table->jsonb('condition_payload')->nullable();
            $table->jsonb('success_modifier_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('trade_routes', function (Blueprint $table) {
            $table->id();
            $table->string('route_id')->unique();
            $table->foreignId('origin_location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('destination_location_id')->constrained('locations')->cascadeOnDelete();
            $table->jsonb('goods_payload');
            $table->string('risk_level')->index();
            $table->integer('travel_time')->default(0);
            $table->jsonb('price_effect_payload');
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('festival_markets', function (Blueprint $table) {
            $table->id();
            $table->string('festival_market_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->foreignId('currency_id')->nullable()->constrained('currencies')->nullOnDelete();
            $table->jsonb('schedule_payload')->nullable();
            $table->jsonb('featured_goods_payload')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('economy_events', function (Blueprint $table) {
            $table->id();
            $table->string('economy_event_id')->unique();
            $table->string('name');
            $table->string('event_type')->index();
            $table->foreignId('region_id')->nullable()->constrained('world_regions')->nullOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->jsonb('trigger_payload')->nullable();
            $table->jsonb('effect_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('economy_asset_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('asset_prompt_id')->unique();
            $table->string('object_type')->index();
            $table->string('object_id')->index();
            $table->string('name');
            $table->string('icon_filename')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('economy_asset_prompts');
        Schema::dropIfExists('economy_events');
        Schema::dropIfExists('festival_markets');
        Schema::dropIfExists('trade_routes');
        Schema::dropIfExists('barter_rules');
        Schema::dropIfExists('regional_price_modifiers');
        Schema::dropIfExists('vendor_profiles');
        Schema::dropIfExists('shop_inventories');
        Schema::dropIfExists('shops');
        Schema::dropIfExists('shop_types');
        Schema::dropIfExists('recipe_ingredients');
        Schema::dropIfExists('recipes');
        Schema::dropIfExists('recipe_categories');
        Schema::dropIfExists('crafting_stations');
        Schema::dropIfExists('currencies');
    }
};
