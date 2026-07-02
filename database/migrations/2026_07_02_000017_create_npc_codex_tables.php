<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('npc_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon_hint')->nullable();
            $table->string('color_hint')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_roles', function (Blueprint $table) {
            $table->id();
            $table->string('role_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon_hint')->nullable();
            $table->string('color_hint')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_professions', function (Blueprint $table) {
            $table->id();
            $table->string('profession_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon_hint')->nullable();
            $table->string('color_hint')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_factions', function (Blueprint $table) {
            $table->id();
            $table->string('faction_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('reputation_scope')->nullable();
            $table->string('icon_hint')->nullable();
            $table->string('color_hint')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_personalities', function (Blueprint $table) {
            $table->id();
            $table->string('personality_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('dialogue_modifier')->nullable();
            $table->decimal('friendship_modifier', 5, 2)->default(1);
            $table->string('schedule_modifier')->nullable();
            $table->jsonb('reaction_tags')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_relationship_levels', function (Blueprint $table) {
            $table->id();
            $table->string('relationship_level_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->integer('min_points')->default(0);
            $table->integer('max_points')->default(0);
            $table->decimal('price_modifier', 5, 2)->default(1);
            $table->decimal('gift_modifier', 5, 2)->default(1);
            $table->jsonb('dialogue_unlocks')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npcs', function (Blueprint $table) {
            $table->id();
            $table->string('npc_id')->unique();
            $table->string('slug')->unique();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('full_name');
            $table->string('nickname')->nullable();
            $table->string('title')->nullable();
            $table->foreignId('category_id')->constrained('npc_categories')->cascadeOnDelete();
            $table->foreignId('role_id')->constrained('npc_roles')->cascadeOnDelete();
            $table->foreignId('profession_id')->nullable()->constrained('npc_professions')->nullOnDelete();
            $table->foreignId('faction_id')->nullable()->constrained('npc_factions')->nullOnDelete();
            $table->string('region')->index();
            $table->string('province')->nullable()->index();
            $table->string('hometown')->nullable();
            $table->string('age_group')->nullable();
            $table->string('gender')->nullable();
            $table->foreignId('personality_id')->nullable()->constrained('npc_personalities')->nullOnDelete();
            $table->foreignId('relationship_level_id')->nullable()->constrained('npc_relationship_levels')->nullOnDelete();
            $table->string('portrait_filename')->nullable();
            $table->string('overworld_sprite')->nullable();
            $table->string('battle_sprite')->nullable();
            $table->string('voice_profile_id')->nullable();
            $table->text('biography')->nullable();
            $table->text('cultural_background')->nullable();
            $table->string('language')->nullable();
            $table->string('faith_tradition')->nullable();
            $table->integer('reputation')->default(0);
            $table->integer('friendship_points')->default(0);
            $table->integer('trust_points')->default(0);
            $table->boolean('romance_allowed')->default(false);
            $table->boolean('recruitable')->default(false);
            $table->string('companion_unlock')->nullable();
            $table->string('shop_id')->nullable()->index();
            $table->string('trainer_id')->nullable()->index();
            $table->string('service_id')->nullable()->index();
            $table->string('schedule_id')->nullable()->index();
            $table->string('dialogue_root_id')->nullable()->index();
            $table->string('location_id')->nullable()->index();
            $table->jsonb('availability_payload')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_locations', function (Blueprint $table) {
            $table->id();
            $table->string('location_id')->unique();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->string('name');
            $table->string('region')->index();
            $table->string('province')->nullable();
            $table->string('settlement')->nullable();
            $table->string('map_key')->nullable()->index();
            $table->integer('x')->nullable();
            $table->integer('y')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('npc_schedules', function (Blueprint $table) {
            $table->id();
            $table->string('schedule_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('timezone')->default('Asia/Manila');
            $table->jsonb('morning')->nullable();
            $table->jsonb('afternoon')->nullable();
            $table->jsonb('evening')->nullable();
            $table->jsonb('night')->nullable();
            $table->jsonb('late_night')->nullable();
            $table->jsonb('festival_schedule')->nullable();
            $table->jsonb('emergency_schedule')->nullable();
            $table->jsonb('weather_schedule')->nullable();
            $table->jsonb('story_progress_schedule')->nullable();
            $table->jsonb('route_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_dialogues', function (Blueprint $table) {
            $table->id();
            $table->string('dialogue_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('root_key')->default('default');
            $table->string('title');
            $table->jsonb('nodes');
            $table->text('fallback_line')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_dialogue_conditions', function (Blueprint $table) {
            $table->id();
            $table->string('condition_id')->unique();
            $table->foreignId('dialogue_id')->constrained('npc_dialogues')->cascadeOnDelete();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->jsonb('condition_payload');
            $table->integer('priority')->default(0);
            $table->timestamps();
        });

        Schema::create('npc_services', function (Blueprint $table) {
            $table->id();
            $table->string('service_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('service_type')->index();
            $table->string('name');
            $table->jsonb('opening_hours')->nullable();
            $table->jsonb('pricing_payload')->nullable();
            $table->jsonb('requirements_payload')->nullable();
            $table->jsonb('relationship_modifiers')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_shops', function (Blueprint $table) {
            $table->id();
            $table->string('shop_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('name');
            $table->string('shop_type')->index();
            $table->jsonb('refresh_rule')->nullable();
            $table->string('currency_type')->default('gold');
            $table->jsonb('inventory_rule_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_inventory', function (Blueprint $table) {
            $table->id();
            $table->string('inventory_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->foreignId('shop_id')->nullable()->constrained('npc_shops')->cascadeOnDelete();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->nullOnDelete();
            $table->foreignId('monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->integer('quantity')->default(1);
            $table->decimal('price_modifier', 6, 2)->default(1);
            $table->jsonb('refresh_rule')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_quests', function (Blueprint $table) {
            $table->id();
            $table->string('npc_quest_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('quest_id')->index();
            $table->string('quest_role')->index();
            $table->string('quest_type')->index();
            $table->jsonb('requirements_payload')->nullable();
            $table->jsonb('rewards_payload')->nullable();
            $table->boolean('is_repeatable')->default(false);
            $table->timestamps();
        });

        Schema::create('npc_training', function (Blueprint $table) {
            $table->id();
            $table->string('training_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('trainer_id')->nullable()->index();
            $table->string('lesson_type')->index();
            $table->string('lesson_key');
            $table->jsonb('teaches_payload')->nullable();
            $table->jsonb('requirements_payload')->nullable();
            $table->jsonb('cost_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_portraits', function (Blueprint $table) {
            $table->id();
            $table->string('portrait_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('portrait_filename')->nullable();
            $table->string('bust_filename')->nullable();
            $table->string('emotion_sheet_filename')->nullable();
            $table->text('style_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('npc_voice_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('voice_profile_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('voice_type')->nullable();
            $table->string('accent')->nullable();
            $table->string('speaking_speed')->nullable();
            $table->string('vocabulary')->nullable();
            $table->jsonb('catchphrases')->nullable();
            $table->string('emotional_range')->nullable();
            $table->jsonb('battle_callouts')->nullable();
            $table->string('greeting_style')->nullable();
            $table->timestamps();
        });

        Schema::create('npc_asset_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('asset_prompt_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->string('portrait_filename')->nullable();
            $table->string('overworld_sprite')->nullable();
            $table->string('battle_sprite')->nullable();
            $table->string('bust_filename')->nullable();
            $table->string('emotion_sheet_filename')->nullable();
            $table->text('portrait_prompt')->nullable();
            $table->text('overworld_sprite_prompt')->nullable();
            $table->text('battle_sprite_prompt')->nullable();
            $table->text('bust_prompt')->nullable();
            $table->text('emotion_sheet_prompt')->nullable();
            $table->text('voice_description_prompt')->nullable();
            $table->text('design_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('npc_asset_prompts');
        Schema::dropIfExists('npc_voice_profiles');
        Schema::dropIfExists('npc_portraits');
        Schema::dropIfExists('npc_training');
        Schema::dropIfExists('npc_quests');
        Schema::dropIfExists('npc_inventory');
        Schema::dropIfExists('npc_shops');
        Schema::dropIfExists('npc_services');
        Schema::dropIfExists('npc_dialogue_conditions');
        Schema::dropIfExists('npc_dialogues');
        Schema::dropIfExists('npc_schedules');
        Schema::dropIfExists('npc_locations');
        Schema::dropIfExists('npcs');
        Schema::dropIfExists('npc_relationship_levels');
        Schema::dropIfExists('npc_personalities');
        Schema::dropIfExists('npc_factions');
        Schema::dropIfExists('npc_professions');
        Schema::dropIfExists('npc_roles');
        Schema::dropIfExists('npc_categories');
    }
};
