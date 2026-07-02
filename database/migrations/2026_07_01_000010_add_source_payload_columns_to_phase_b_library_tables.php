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

    private array $columns = [
        'theme' => 'text',
        'battle_role' => 'string',
        'stat_focus' => 'string',
        'gameplay_role' => 'text',
        'behavior_rule' => 'text',
        'effect_type' => 'string',
        'default_duration' => 'string',
        'stackable' => 'boolean',
        'example_use_case' => 'text',
        'rank_order' => 'unsignedSmallInteger',
    ];

    public function up(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                foreach ($this->columns as $column => $type) {
                    if (! Schema::hasColumn($tableName, $column)) {
                        $table->{$type}($column)->nullable();
                    }
                }
            });
        }
    }

    public function down(): void
    {
        foreach ($this->tables as $tableName) {
            Schema::table($tableName, function (Blueprint $table) use ($tableName) {
                foreach (array_keys($this->columns) as $column) {
                    if (Schema::hasColumn($tableName, $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }
    }
};
