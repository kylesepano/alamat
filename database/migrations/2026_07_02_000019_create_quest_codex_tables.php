<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quest_categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->string('color_hint')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('quest_types', function (Blueprint $table) {
            $table->id();
            $table->string('type_id')->unique();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('quest_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('status_id')->unique();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('quests', function (Blueprint $table) {
            $table->id();
            $table->string('quest_id')->unique();
            $table->string('slug')->unique();
            $table->string('title');
            $table->foreignId('category_id')->constrained('quest_categories')->cascadeOnDelete();
            $table->string('quest_type')->index();
            $table->string('region')->index();
            $table->string('province')->nullable()->index();
            $table->foreignId('location_id')->nullable()->constrained('npc_locations')->nullOnDelete();
            $table->foreignId('starting_npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('ending_npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('related_monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->foreignId('related_faction_id')->nullable()->constrained('npc_factions')->nullOnDelete();
            $table->integer('required_level')->nullable();
            $table->integer('required_story_chapter')->nullable();
            $table->foreignId('required_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->boolean('repeatable')->default(false);
            $table->boolean('hidden')->default(false);
            $table->boolean('time_limited')->default(false);
            $table->jsonb('start_condition_payload')->nullable();
            $table->jsonb('failure_condition_payload')->nullable();
            $table->jsonb('completion_condition_payload')->nullable();
            $table->text('short_description');
            $table->text('full_description')->nullable();
            $table->text('lore_context')->nullable();
            $table->text('player_choice_notes')->nullable();
            $table->string('moral_theme')->nullable();
            $table->text('reward_summary')->nullable();
            $table->string('icon_filename')->nullable();
            $table->string('banner_filename')->nullable();
            $table->string('quest_marker_icon')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('quest_steps', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('step_id')->unique();
            $table->unsignedInteger('step_order');
            $table->string('title');
            $table->text('description');
            $table->string('objective_type')->index();
            $table->jsonb('target_payload')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('npc_locations')->nullOnDelete();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->foreignId('monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->integer('required_quantity')->nullable();
            $table->boolean('optional')->default(false);
            $table->string('branch_key')->nullable();
            $table->string('completion_flag')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_objectives', function (Blueprint $table) {
            $table->id();
            $table->string('objective_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->foreignId('step_id')->nullable()->constrained('quest_steps')->cascadeOnDelete();
            $table->string('objective_type')->index();
            $table->text('description');
            $table->jsonb('target_payload')->nullable();
            $table->integer('required_quantity')->default(1);
            $table->string('progress_key')->nullable();
            $table->boolean('is_hidden')->default(false);
            $table->timestamps();
        });

        Schema::create('quest_rewards', function (Blueprint $table) {
            $table->id();
            $table->string('reward_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('reward_type')->index();
            $table->foreignId('item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->foreignId('equipment_id')->nullable()->constrained('equipment')->nullOnDelete();
            $table->string('skill_id')->nullable();
            $table->foreignId('monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->integer('npc_relationship_points')->nullable();
            $table->integer('faction_reputation_points')->nullable();
            $table->integer('gold')->nullable();
            $table->integer('experience')->nullable();
            $table->integer('quantity')->nullable();
            $table->jsonb('reward_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_requirements', function (Blueprint $table) {
            $table->id();
            $table->string('requirement_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('requirement_type')->index();
            $table->string('required_id')->nullable();
            $table->string('required_value')->nullable();
            $table->jsonb('requirement_payload')->nullable();
            $table->text('failure_message')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_dialogues', function (Blueprint $table) {
            $table->id();
            $table->string('dialogue_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->foreignId('npc_id')->nullable()->constrained('npcs')->nullOnDelete();
            $table->string('dialogue_key')->index();
            $table->jsonb('nodes');
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_flags', function (Blueprint $table) {
            $table->id();
            $table->string('flag_id')->unique();
            $table->foreignId('quest_id')->nullable()->constrained('quests')->cascadeOnDelete();
            $table->string('flag_name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->boolean('default_value')->default(false);
            $table->string('scope')->default('player');
            $table->timestamps();
        });

        Schema::create('quest_branches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('branch_id')->unique();
            $table->string('branch_name');
            $table->jsonb('condition_payload')->nullable();
            $table->jsonb('result_payload')->nullable();
            $table->string('moral_alignment')->nullable();
            $table->foreignId('unlocks_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->foreignId('locks_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('quest_chains', function (Blueprint $table) {
            $table->id();
            $table->string('chain_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->jsonb('quest_ids');
            $table->jsonb('chain_order');
            $table->jsonb('completion_reward_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_markers', function (Blueprint $table) {
            $table->id();
            $table->string('marker_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('marker_type')->index();
            $table->string('region')->index();
            $table->string('province')->nullable();
            $table->foreignId('location_id')->nullable()->constrained('npc_locations')->nullOnDelete();
            $table->string('map_key')->nullable();
            $table->integer('x')->nullable();
            $table->integer('y')->nullable();
            $table->string('icon_filename')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_asset_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('asset_prompt_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('icon_filename')->nullable();
            $table->string('banner_filename')->nullable();
            $table->string('quest_marker_icon')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->text('icon_prompt')->nullable();
            $table->text('banner_prompt')->nullable();
            $table->text('design_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('quest_player_progress', function (Blueprint $table) {
            $table->id();
            $table->string('player_key')->default('local-dev')->index();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->string('status')->default('active')->index();
            $table->integer('current_step_order')->default(1);
            $table->jsonb('progress_payload')->nullable();
            $table->jsonb('chosen_branches')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
            $table->unique(['player_key', 'quest_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quest_player_progress');
        Schema::dropIfExists('quest_asset_prompts');
        Schema::dropIfExists('quest_markers');
        Schema::dropIfExists('quest_chains');
        Schema::dropIfExists('quest_branches');
        Schema::dropIfExists('quest_flags');
        Schema::dropIfExists('quest_dialogues');
        Schema::dropIfExists('quest_requirements');
        Schema::dropIfExists('quest_rewards');
        Schema::dropIfExists('quest_objectives');
        Schema::dropIfExists('quest_steps');
        Schema::dropIfExists('quests');
        Schema::dropIfExists('quest_statuses');
        Schema::dropIfExists('quest_types');
        Schema::dropIfExists('quest_categories');
    }
};
