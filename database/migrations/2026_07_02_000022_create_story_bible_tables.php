<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('story_acts', function (Blueprint $table) {
            $table->id();
            $table->string('act_id')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->string('theme')->nullable();
            $table->string('opening_scene')->nullable();
            $table->string('closing_scene')->nullable();
            $table->integer('recommended_level')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('story_chapters', function (Blueprint $table) {
            $table->id();
            $table->string('chapter_id')->unique();
            $table->foreignId('act_id')->constrained('story_acts')->cascadeOnDelete();
            $table->unsignedInteger('chapter_number');
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->string('region')->nullable();
            $table->integer('recommended_level')->nullable();
            $table->jsonb('major_quests')->nullable();
            $table->jsonb('important_npcs')->nullable();
            $table->jsonb('major_monsters')->nullable();
            $table->jsonb('legendary_encounters')->nullable();
            $table->text('emotional_climax')->nullable();
            $table->jsonb('regional_exploration')->nullable();
            $table->jsonb('moral_choices')->nullable();
            $table->jsonb('unlock_conditions')->nullable();
            $table->jsonb('completion_conditions')->nullable();
            $table->timestamps();
        });

        Schema::create('story_scenes', function (Blueprint $table) {
            $table->id();
            $table->string('scene_id')->unique();
            $table->foreignId('chapter_id')->constrained('story_chapters')->cascadeOnDelete();
            $table->unsignedInteger('scene_order')->default(0);
            $table->string('title');
            $table->string('scene_type')->index();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->jsonb('participating_npcs')->nullable();
            $table->jsonb('participating_monsters')->nullable();
            $table->string('dialogue_root')->nullable();
            $table->string('cinematic_id')->nullable();
            $table->string('music_track')->nullable();
            $table->string('weather')->nullable();
            $table->string('time_of_day')->nullable();
            $table->jsonb('story_flags')->nullable();
            $table->timestamps();
        });

        Schema::create('dialogue_flags', function (Blueprint $table) {
            $table->id();
            $table->string('flag_id')->unique();
            $table->string('code')->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('scope')->index();
            $table->boolean('default_value')->default(false);
            $table->boolean('is_persistent')->default(true);
            $table->timestamps();
        });

        Schema::create('dialogues', function (Blueprint $table) {
            $table->id();
            $table->string('dialogue_id')->unique();
            $table->foreignId('scene_id')->nullable()->constrained('story_scenes')->nullOnDelete();
            $table->string('speaker');
            $table->string('portrait')->nullable();
            $table->string('emotion')->nullable();
            $table->text('text');
            $table->string('voice_cue')->nullable();
            $table->string('animation_cue')->nullable();
            $table->jsonb('player_choices')->nullable();
            $table->jsonb('conditions')->nullable();
            $table->jsonb('consequences')->nullable();
            $table->string('locale_key')->nullable();
            $table->text('voice_direction_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('dialogue_choices', function (Blueprint $table) {
            $table->id();
            $table->string('choice_id')->unique();
            $table->foreignId('dialogue_id')->constrained('dialogues')->cascadeOnDelete();
            $table->text('choice_text');
            $table->string('value_axis')->nullable();
            $table->string('next_dialogue_id')->nullable();
            $table->jsonb('condition_payload')->nullable();
            $table->jsonb('consequence_payload')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('cutscenes', function (Blueprint $table) {
            $table->id();
            $table->string('cutscene_id')->unique();
            $table->foreignId('scene_id')->nullable()->constrained('story_scenes')->nullOnDelete();
            $table->string('cinematic_id')->nullable();
            $table->string('title');
            $table->jsonb('trigger_payload')->nullable();
            $table->jsonb('storyboard_payload')->nullable();
            $table->boolean('skippable')->default(true);
            $table->boolean('replayable')->default(true);
            $table->timestamps();
        });

        Schema::create('cinematics', function (Blueprint $table) {
            $table->id();
            $table->string('cinematic_id')->unique();
            $table->string('title');
            $table->string('cinematic_type')->index();
            $table->text('camera_direction')->nullable();
            $table->string('music_reference')->nullable();
            $table->integer('duration_seconds')->default(0);
            $table->string('asset_prompt_id')->nullable();
            $table->timestamps();
        });

        Schema::create('lore_books', function (Blueprint $table) {
            $table->id();
            $table->string('lore_book_id')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('collectible_type')->index();
            $table->text('excerpt')->nullable();
            $table->text('full_text')->nullable();
            $table->foreignId('region_id')->nullable()->constrained('world_regions')->nullOnDelete();
            $table->foreignId('location_id')->nullable()->constrained('locations')->nullOnDelete();
            $table->jsonb('unlock_condition_payload')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('folk_tales', function (Blueprint $table) {
            $table->id();
            $table->string('tale_id')->unique();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('region')->nullable();
            $table->string('narrator')->nullable();
            $table->text('summary')->nullable();
            $table->jsonb('moral_axes')->nullable();
            $table->jsonb('related_monsters')->nullable();
            $table->text('localization_notes')->nullable();
            $table->timestamps();
        });

        Schema::create('songs', function (Blueprint $table) {
            $table->id();
            $table->string('song_id')->unique();
            $table->string('title');
            $table->string('song_type')->index();
            $table->text('lyrics_excerpt')->nullable();
            $table->string('music_reference')->nullable();
            $table->string('mood')->nullable();
            $table->string('usage_context')->nullable();
            $table->timestamps();
        });

        Schema::create('poems', function (Blueprint $table) {
            $table->id();
            $table->string('poem_id')->unique();
            $table->string('title');
            $table->string('poem_type')->index();
            $table->text('text');
            $table->foreignId('related_chapter_id')->nullable()->constrained('story_chapters')->nullOnDelete();
            $table->timestamps();
        });

        Schema::create('timeline_entries', function (Blueprint $table) {
            $table->id();
            $table->string('timeline_id')->unique();
            $table->string('age');
            $table->string('slug')->unique();
            $table->unsignedInteger('sequence_order')->default(0);
            $table->text('summary')->nullable();
            $table->text('cause')->nullable();
            $table->text('effect')->nullable();
            $table->jsonb('participating_factions')->nullable();
            $table->jsonb('participating_monsters')->nullable();
            $table->jsonb('lasting_consequences')->nullable();
            $table->timestamps();
        });

        Schema::create('historical_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_id')->unique();
            $table->foreignId('timeline_id')->nullable()->constrained('timeline_entries')->nullOnDelete();
            $table->string('title');
            $table->string('date_label')->nullable();
            $table->text('cause')->nullable();
            $table->text('effect')->nullable();
            $table->jsonb('participating_factions')->nullable();
            $table->jsonb('participating_monsters')->nullable();
            $table->jsonb('lasting_consequences')->nullable();
            $table->string('source_type')->nullable();
            $table->timestamps();
        });

        Schema::create('world_history_entries', function (Blueprint $table) {
            $table->id();
            $table->string('history_id')->unique();
            $table->string('topic');
            $table->text('summary')->nullable();
            $table->text('writer_notes')->nullable();
            $table->foreignId('related_timeline_id')->nullable()->constrained('timeline_entries')->nullOnDelete();
            $table->string('design_use')->nullable();
            $table->timestamps();
        });

        Schema::create('mythology_entries', function (Blueprint $table) {
            $table->id();
            $table->string('mythology_id')->unique();
            $table->string('topic');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->jsonb('rules')->nullable();
            $table->jsonb('related_realms')->nullable();
            $table->string('narrative_use')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('character_relationships', function (Blueprint $table) {
            $table->id();
            $table->string('relationship_id')->unique();
            $table->string('source_type')->index();
            $table->string('source_id')->index();
            $table->string('target_type')->index();
            $table->string('target_id')->index();
            $table->string('relationship_type')->index();
            $table->integer('trust_level')->default(0);
            $table->integer('conflict_level')->default(0);
            $table->string('visibility')->default('public');
            $table->jsonb('unlock_condition_payload')->nullable();
            $table->jsonb('story_impact_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('ending_routes', function (Blueprint $table) {
            $table->id();
            $table->string('ending_id')->unique();
            $table->string('ending_type')->index();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->jsonb('requirement_payload')->nullable();
            $table->jsonb('consequence_payload')->nullable();
            $table->boolean('is_canonical_optional')->default(false);
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('epilogues', function (Blueprint $table) {
            $table->id();
            $table->string('epilogue_id')->unique();
            $table->foreignId('ending_id')->constrained('ending_routes')->cascadeOnDelete();
            $table->string('title');
            $table->text('text');
            $table->jsonb('affected_regions')->nullable();
            $table->jsonb('affected_characters')->nullable();
            $table->string('asset_prompt_id')->nullable();
            $table->timestamps();
        });

        Schema::create('story_asset_prompts', function (Blueprint $table) {
            $table->id();
            $table->string('asset_prompt_id')->unique();
            $table->string('asset_type')->index();
            $table->string('owner_type')->index();
            $table->string('owner_id')->index();
            $table->string('filename');
            $table->text('prompt');
            $table->text('negative_prompt')->nullable();
            $table->text('style_notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach ([
            'story_asset_prompts', 'epilogues', 'ending_routes', 'character_relationships', 'mythology_entries',
            'world_history_entries', 'historical_events', 'timeline_entries', 'poems', 'songs', 'folk_tales',
            'lore_books', 'cinematics', 'cutscenes', 'dialogue_choices', 'dialogues', 'dialogue_flags',
            'story_scenes', 'story_chapters', 'story_acts',
        ] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
