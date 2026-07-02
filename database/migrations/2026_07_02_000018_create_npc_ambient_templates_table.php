<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('npc_ambient_templates', function (Blueprint $table) {
            $table->id();
            $table->string('ambient_id')->unique();
            $table->string('archetype')->index();
            $table->string('region')->index();
            $table->string('settlement_type')->index();
            $table->string('role_tag')->index();
            $table->jsonb('schedule_payload')->nullable();
            $table->jsonb('dialogue_pool')->nullable();
            $table->jsonb('spawn_rules')->nullable();
            $table->text('asset_prompt')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('npc_ambient_templates');
    }
};
