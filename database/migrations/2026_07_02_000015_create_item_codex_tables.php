<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('item_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->foreignId('parent_category_id')->nullable()->constrained('item_categories')->nullOnDelete();
            $table->string('icon');
            $table->string('color_hint');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('item_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('category_id')->constrained('item_categories');
            $table->string('item_type');
            $table->foreignId('rarity_id')->constrained('library_rarity_tiers');
            $table->text('description');
            $table->longText('lore');
            $table->string('region_origin')->nullable();
            $table->string('province_origin')->nullable();
            $table->string('ethnolinguistic_origin')->nullable();
            $table->text('source_note')->nullable();
            $table->boolean('stackable')->default(true);
            $table->unsignedInteger('max_stack')->default(99);
            $table->boolean('sellable')->default(true);
            $table->boolean('buyable')->default(false);
            $table->unsignedInteger('base_price')->default(0);
            $table->unsignedInteger('sell_price')->default(0);
            $table->decimal('weight', 8, 2)->nullable();
            $table->boolean('usable_in_battle')->default(false);
            $table->boolean('usable_in_field')->default(false);
            $table->boolean('usable_in_crafting')->default(false);
            $table->boolean('usable_in_quests')->default(false);
            $table->boolean('consumable')->default(false);
            $table->unsignedInteger('cooldown')->nullable();
            $table->text('effect_summary')->nullable();
            $table->jsonb('effect_payload')->nullable();
            $table->foreignId('status_effect_id')->nullable()->constrained('library_status_effects')->nullOnDelete();
            $table->string('skill_id')->nullable();
            $table->foreignId('monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->string('quest_id')->nullable();
            $table->string('offering_affinity')->nullable();
            $table->string('habitat_affinity')->nullable();
            $table->string('weather_affinity')->nullable();
            $table->string('time_affinity')->nullable();
            $table->string('icon_filename');
            $table->string('sprite_filename')->nullable();
            $table->string('thumbnail_filename')->nullable();
            $table->longText('asset_prompt')->nullable();
            $table->longText('icon_prompt')->nullable();
            $table->longText('design_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['item_type', 'is_active']);
            $table->index('region_origin');
            $table->index('skill_id');
            $table->index('quest_id');
        });

        Schema::create('item_recipes', function (Blueprint $table) {
            $table->id();
            $table->string('recipe_id')->unique();
            $table->foreignId('output_item_id')->constrained('items')->cascadeOnDelete();
            $table->unsignedInteger('output_quantity')->default(1);
            $table->string('recipe_type');
            $table->string('required_station')->nullable();
            $table->unsignedInteger('required_level')->nullable();
            $table->string('required_quest_id')->nullable();
            $table->string('required_npc_id')->nullable();
            $table->string('required_weather')->nullable();
            $table->string('required_habitat')->nullable();
            $table->jsonb('ingredients');
            $table->decimal('success_rate', 5, 2)->default(1);
            $table->unsignedInteger('gold_cost')->default(0);
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('monster_drop_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monster_id')->constrained('monsters')->cascadeOnDelete();
            $table->foreignId('item_id')->constrained('items')->cascadeOnDelete();
            $table->decimal('drop_rate', 6, 4);
            $table->unsignedInteger('min_quantity')->default(1);
            $table->unsignedInteger('max_quantity')->default(1);
            $table->string('condition')->nullable();
            $table->string('rarity_modifier')->nullable();
            $table->string('weather_modifier')->nullable();
            $table->string('habitat_modifier')->nullable();
            $table->boolean('is_guaranteed')->default(false);
            $table->timestamps();
            $table->unique(['monster_id', 'item_id', 'condition']);
        });

        Schema::create('quest_item_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('quest_id')->nullable();
            $table->foreignId('item_id')->constrained('items')->cascadeOnDelete();
            $table->unsignedInteger('quantity_required')->default(1);
            $table->boolean('consumed_on_turn_in')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quest_item_requirements');
        Schema::dropIfExists('monster_drop_tables');
        Schema::dropIfExists('item_recipes');
        Schema::dropIfExists('items');
        Schema::dropIfExists('item_categories');
    }
};
