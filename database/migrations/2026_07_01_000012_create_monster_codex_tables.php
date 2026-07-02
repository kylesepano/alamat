<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('monsters', function (Blueprint $table) {
            $table->id();
            $table->string('monster_id')->unique();
            $table->string('filipino_name');
            $table->string('english_name');
            $table->string('scientific_name')->nullable();
            $table->string('nickname')->nullable();
            $table->string('slug')->unique();
            $table->string('region_of_origin');
            $table->string('province_origin')->nullable();
            $table->string('ethnolinguistic_origin')->nullable();
            $table->string('folklore_source_url')->nullable();
            $table->string('mythological_category');
            $table->foreignId('rarity_id')->constrained('library_rarity_tiers');
            $table->foreignId('nilalang_order_id')->constrained('library_nilalang_orders');
            $table->foreignId('combat_class_id')->constrained('library_combat_classes');
            $table->foreignId('temperament_id')->nullable()->constrained('library_temperaments')->nullOnDelete();
            $table->foreignId('ai_behavior_id')->nullable()->constrained('library_ai_behaviors')->nullOnDelete();
            $table->text('passive_ability');
            $table->unsignedSmallInteger('hp')->default(0);
            $table->unsignedSmallInteger('attack')->default(0);
            $table->unsignedSmallInteger('magic')->default(0);
            $table->unsignedSmallInteger('defense')->default(0);
            $table->unsignedSmallInteger('spirit_defense')->default(0);
            $table->unsignedSmallInteger('speed')->default(0);
            $table->unsignedSmallInteger('luck')->default(0);
            $table->unsignedSmallInteger('faith')->default(0);
            $table->string('capture_difficulty')->default('0');
            $table->foreignId('trust_method_id')->nullable()->constrained('library_trust_methods')->nullOnDelete();
            $table->string('favorite_food_offering')->nullable();
            $table->longText('folklore_summary');
            $table->longText('alamat_lore');
            $table->longText('lore_and_backstory');
            $table->longText('physical_description');
            $table->text('personality_summary')->nullable();
            $table->text('weaknesses')->nullable();
            $table->text('resistances')->nullable();
            $table->text('npc_related')->nullable();
            $table->text('quest_appearances')->nullable();
            $table->text('boss_variant')->nullable();
            $table->text('corrupted_variant')->nullable();
            $table->text('divine_variant')->nullable();
            $table->string('sprite_filename');
            $table->string('battle_portrait_filename');
            $table->string('overworld_sprite_filename');
            $table->text('sound_effects')->nullable();
            $table->text('cry_voice_description')->nullable();
            $table->text('drop_items')->nullable();
            $table->text('equipment_compatibility')->nullable();
            $table->longText('sprite_prompt');
            $table->longText('portrait_prompt');
            $table->longText('battle_animation_prompt');
            $table->longText('design_notes')->nullable();
            $table->boolean('is_recruitable')->default(true);
            $table->boolean('is_boss')->default(false);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        $this->createPivot('monster_affiliation', 'affiliation_id', 'library_affiliations');
        $this->createPivot('monster_personality_trait', 'personality_trait_id', 'library_personality_traits');
        $this->createPivot('monster_habitat', 'habitat_id', 'library_habitats');
        $this->createPivot('monster_weather_type', 'weather_type_id', 'library_weather_types');
        $this->createPivot('monster_active_time', 'active_time_id', 'library_active_times');

        Schema::create('monster_unique_skills', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monster_id')->constrained('monsters')->cascadeOnDelete();
            $table->string('skill_name');
            $table->string('skill_slug');
            $table->text('description');
            $table->text('lore');
            $table->foreignId('category_id')->nullable()->constrained('library_skill_categories')->nullOnDelete();
            $table->foreignId('damage_type_id')->nullable()->constrained('library_damage_types')->nullOnDelete();
            $table->foreignId('target_type_id')->nullable()->constrained('library_target_types')->nullOnDelete();
            $table->unsignedSmallInteger('power')->nullable();
            $table->unsignedSmallInteger('accuracy')->nullable();
            $table->unsignedSmallInteger('mana_cost')->nullable();
            $table->unsignedSmallInteger('faith_cost')->nullable();
            $table->unsignedSmallInteger('cooldown')->nullable();
            $table->foreignId('status_effect_id')->nullable()->constrained('library_status_effects')->nullOnDelete();
            $table->longText('animation_prompt')->nullable();
            $table->longText('icon_prompt')->nullable();
            $table->text('sound_effect')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();
            $table->unique(['monster_id', 'skill_slug']);
        });

        Schema::create('monster_common_skill_links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('monster_id')->constrained('monsters')->cascadeOnDelete();
            $table->string('skill_name');
            $table->string('skill_slug');
            $table->foreignId('category_id')->nullable()->constrained('library_skill_categories')->nullOnDelete();
            $table->foreignId('damage_type_id')->nullable()->constrained('library_damage_types')->nullOnDelete();
            $table->unsignedSmallInteger('unlock_level')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['monster_id', 'skill_slug']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monster_common_skill_links');
        Schema::dropIfExists('monster_unique_skills');
        Schema::dropIfExists('monster_active_time');
        Schema::dropIfExists('monster_weather_type');
        Schema::dropIfExists('monster_habitat');
        Schema::dropIfExists('monster_personality_trait');
        Schema::dropIfExists('monster_affiliation');
        Schema::dropIfExists('monsters');
    }

    private function createPivot(string $tableName, string $libraryColumn, string $libraryTable): void
    {
        Schema::create($tableName, function (Blueprint $table) use ($libraryColumn, $libraryTable) {
            $table->foreignId('monster_id')->constrained('monsters')->cascadeOnDelete();
            $table->foreignId($libraryColumn)->constrained($libraryTable)->cascadeOnDelete();
            $table->primary(['monster_id', $libraryColumn]);
        });
    }
};
