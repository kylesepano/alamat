<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    private array $tables = [
        'library_affiliations',
        'library_combat_classes',
        'library_nilalang_orders',
        'library_personality_traits',
        'library_ai_behaviors',
        'library_temperaments',
        'library_status_effects',
        'library_trust_methods',
        'library_habitats',
        'library_weather_types',
        'library_active_times',
        'library_rarity_tiers',
        'library_growth_ranks',
        'library_equipment_categories',
        'library_item_categories',
        'library_skill_categories',
        'library_target_types',
        'library_damage_types',
    ];

    public function up(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::create($tableName, function (Blueprint $table) {
                $table->id();
                $table->string('code')->unique();
                $table->string('name');
                $table->string('slug')->unique();
                $table->text('description');
                $table->string('icon_hint')->nullable();
                $table->string('color_hint', 16)->nullable();
                $table->unsignedSmallInteger('sort_order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->text('theme')->nullable();
                $table->string('battle_role')->nullable();
                $table->string('stat_focus')->nullable();
                $table->text('gameplay_role')->nullable();
                $table->text('behavior_rule')->nullable();
                $table->string('effect_type')->nullable();
                $table->string('default_duration')->nullable();
                $table->boolean('stackable')->nullable();
                $table->text('example_use_case')->nullable();
                $table->unsignedSmallInteger('rank_order')->nullable();
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        foreach (array_reverse($this->tables) as $tableName) {
            Schema::dropIfExists($tableName);
        }
    }
};
