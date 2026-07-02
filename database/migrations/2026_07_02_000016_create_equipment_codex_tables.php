<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equipment_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('slot_type');
            $table->string('icon');
            $table->string('color_hint');
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('equipment_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->foreignId('category_id')->constrained('equipment_categories');
            $table->string('slot_type');
            $table->foreignId('rarity_id')->constrained('library_rarity_tiers');
            $table->text('description');
            $table->longText('lore');
            $table->string('region_origin')->nullable();
            $table->string('province_origin')->nullable();
            $table->string('ethnolinguistic_origin')->nullable();
            $table->text('source_note')->nullable();
            foreach (['hp', 'mana', 'faith', 'stamina', 'attack', 'magic', 'defense', 'spirit_defense', 'speed', 'luck'] as $stat) {
                $table->integer("{$stat}_bonus")->default(0);
            }
            $table->unsignedInteger('required_level')->nullable();
            $table->string('required_class')->nullable();
            $table->string('required_affiliation')->nullable();
            $table->foreignId('required_monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->string('required_quest_id')->nullable();
            $table->boolean('usable_by_player')->default(true);
            $table->boolean('usable_by_monsters')->default(false);
            $table->boolean('usable_by_npcs')->default(true);
            $table->boolean('stackable')->default(false);
            $table->boolean('sellable')->default(true);
            $table->boolean('buyable')->default(false);
            $table->unsignedInteger('base_price')->default(0);
            $table->unsignedInteger('sell_price')->default(0);
            $table->string('passive_id')->nullable();
            $table->string('skill_id')->nullable();
            $table->foreignId('status_effect_id')->nullable()->constrained('library_status_effects')->nullOnDelete();
            $table->jsonb('effect_payload')->nullable();
            $table->jsonb('compatibility_payload')->nullable();
            $table->string('icon_filename');
            $table->string('sprite_filename')->nullable();
            $table->string('thumbnail_filename')->nullable();
            $table->longText('asset_prompt')->nullable();
            $table->longText('icon_prompt')->nullable();
            $table->longText('design_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->index(['slot_type', 'is_active']);
            $table->index(['required_class', 'required_affiliation']);
        });

        Schema::create('equipment_upgrade_paths', function (Blueprint $table) {
            $table->id();
            $table->string('upgrade_id')->unique();
            $table->foreignId('base_equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->foreignId('upgraded_equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->unsignedInteger('upgrade_level')->default(1);
            $table->jsonb('required_items');
            $table->unsignedInteger('required_gold')->default(0);
            $table->string('required_npc_id')->nullable();
            $table->string('required_station')->nullable();
            $table->string('required_quest_id')->nullable();
            $table->decimal('success_rate', 5, 2)->default(1);
            $table->text('description');
            $table->timestamps();
        });

        Schema::create('equipment_sets', function (Blueprint $table) {
            $table->id();
            $table->string('set_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->jsonb('set_bonus_payload');
            $table->longText('lore');
            $table->string('icon');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('equipment_set_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('set_id')->constrained('equipment_sets')->cascadeOnDelete();
            $table->foreignId('equipment_id')->constrained('equipment')->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['set_id', 'equipment_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equipment_set_items');
        Schema::dropIfExists('equipment_sets');
        Schema::dropIfExists('equipment_upgrade_paths');
        Schema::dropIfExists('equipment');
        Schema::dropIfExists('equipment_categories');
    }
};
