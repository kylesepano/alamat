<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('world_regions', function (Blueprint $table) {
            $table->id();
            $table->string('region_id')->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('cultural_notes')->nullable();
            $table->string('default_weather')->nullable();
            $table->string('map_icon')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('province_id')->unique();
            $table->foreignId('region_id')->constrained('world_regions')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('cultural_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('location_types', function (Blueprint $table) {
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

        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('location_id')->unique();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('location_type')->index();
            $table->foreignId('region_id')->nullable()->constrained('world_regions')->nullOnDelete();
            $table->foreignId('province_id')->nullable()->constrained('provinces')->nullOnDelete();
            $table->foreignId('parent_location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->text('description');
            $table->text('lore')->nullable();
            $table->integer('recommended_level_min')->nullable();
            $table->integer('recommended_level_max')->nullable();
            $table->string('danger_level')->nullable()->index();
            $table->string('default_weather')->nullable();
            $table->string('default_terrain')->nullable();
            $table->jsonb('available_times')->nullable();
            $table->jsonb('connected_locations')->nullable();
            $table->string('map_filename')->nullable();
            $table->string('preview_image')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->boolean('is_safe_zone')->default(false);
            $table->boolean('is_dungeon')->default(false);
            $table->boolean('is_hidden')->default(false);
            $table->boolean('is_fast_travel_enabled')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('world_routes', function (Blueprint $table) {
            $table->id();
            $table->string('route_id')->unique();
            $table->string('name');
            $table->foreignId('from_location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('to_location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('route_type')->index();
            $table->integer('travel_time_minutes')->default(0);
            $table->decimal('encounter_rate', 5, 2)->default(0);
            $table->jsonb('condition_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('interiors', function (Blueprint $table) {
            $table->id();
            $table->string('interior_id')->unique();
            $table->foreignId('parent_location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('name');
            $table->string('interior_type')->index();
            $table->string('map_filename')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('dungeons', function (Blueprint $table) {
            $table->id();
            $table->string('dungeon_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('name');
            $table->integer('floor_count')->default(1);
            $table->foreignId('boss_monster_id')->nullable()->constrained('monsters')->nullOnDelete();
            $table->jsonb('dungeon_rules_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('fast_travel_points', function (Blueprint $table) {
            $table->id();
            $table->string('fast_travel_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('name');
            $table->jsonb('unlock_condition_payload')->nullable();
            $table->jsonb('cost_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('map_transitions', function (Blueprint $table) {
            $table->id();
            $table->string('transition_id')->unique();
            $table->foreignId('from_location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('to_location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('transition_type')->index();
            $table->foreignId('required_quest_id')->nullable()->constrained('quests')->nullOnDelete();
            $table->foreignId('required_item_id')->nullable()->constrained('items')->nullOnDelete();
            $table->integer('required_level')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->jsonb('coordinates_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('spawn_zones', function (Blueprint $table) {
            $table->id();
            $table->string('spawn_zone_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->foreignId('monster_id')->constrained('monsters')->cascadeOnDelete();
            $table->decimal('spawn_rate', 5, 2);
            $table->integer('min_level')->default(1);
            $table->integer('max_level')->default(1);
            $table->string('weather_requirement')->nullable();
            $table->string('time_requirement')->nullable();
            $table->foreignId('quest_requirement')->nullable()->constrained('quests')->nullOnDelete();
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('weather_zones', function (Blueprint $table) {
            $table->id();
            $table->string('weather_zone_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('default_weather')->nullable();
            $table->jsonb('weather_table')->nullable();
            $table->jsonb('season_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('npc_placements', function (Blueprint $table) {
            $table->id();
            $table->string('placement_id')->unique();
            $table->foreignId('npc_id')->constrained('npcs')->cascadeOnDelete();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->jsonb('schedule_payload')->nullable();
            $table->jsonb('coordinates_payload')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('world_quest_markers', function (Blueprint $table) {
            $table->id();
            $table->string('world_quest_marker_id')->unique();
            $table->foreignId('quest_id')->constrained('quests')->cascadeOnDelete();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('marker_type')->index();
            $table->jsonb('coordinates_payload')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('world_events', function (Blueprint $table) {
            $table->id();
            $table->string('world_event_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('name');
            $table->string('event_type')->index();
            $table->jsonb('trigger_payload')->nullable();
            $table->jsonb('result_payload')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('map_asset_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('map_asset_prompt_id')->unique();
            $table->foreignId('location_id')->constrained('locations')->cascadeOnDelete();
            $table->string('map_filename')->nullable();
            $table->string('preview_image')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->text('tileset_prompt')->nullable();
            $table->text('design_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('map_asset_prompts');
        Schema::dropIfExists('world_events');
        Schema::dropIfExists('world_quest_markers');
        Schema::dropIfExists('npc_placements');
        Schema::dropIfExists('weather_zones');
        Schema::dropIfExists('spawn_zones');
        Schema::dropIfExists('map_transitions');
        Schema::dropIfExists('fast_travel_points');
        Schema::dropIfExists('dungeons');
        Schema::dropIfExists('interiors');
        Schema::dropIfExists('world_routes');
        Schema::dropIfExists('locations');
        Schema::dropIfExists('location_types');
        Schema::dropIfExists('provinces');
        Schema::dropIfExists('world_regions');
    }
};
