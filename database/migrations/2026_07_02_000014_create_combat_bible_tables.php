<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('combat_bible_entries', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid')->unique();
            $table->string('module');
            $table->string('category');
            $table->string('entry_id');
            $table->string('slug');
            $table->string('name')->nullable();
            $table->string('version')->default('1.0.0');
            $table->string('source');
            $table->text('notes')->nullable();
            $table->jsonb('payload');
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['module', 'category', 'entry_id']);
            $table->unique(['module', 'category', 'slug']);
            $table->index(['module', 'category']);
            $table->index('is_active');
        });

        Schema::create('combat_bible_references', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_entry_id')->constrained('combat_bible_entries')->cascadeOnDelete();
            $table->foreignId('target_entry_id')->nullable()->constrained('combat_bible_entries')->nullOnDelete();
            $table->string('target_module')->nullable();
            $table->string('target_category')->nullable();
            $table->string('target_external_id')->nullable();
            $table->string('reference_type');
            $table->string('field_path');
            $table->boolean('is_required')->default(false);
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['source_entry_id', 'reference_type', 'field_path', 'target_external_id'], 'combat_refs_unique');
            $table->index(['target_module', 'target_category', 'target_external_id'], 'combat_refs_target_idx');
        });

        DB::statement("ALTER TABLE combat_bible_entries ADD CONSTRAINT combat_bible_entries_payload_object CHECK (jsonb_typeof(payload) = 'object')");
        DB::statement("ALTER TABLE combat_bible_entries ADD CONSTRAINT combat_bible_entries_version_semver CHECK (version ~ '^\\d+\\.\\d+\\.\\d+$')");
    }

    public function down(): void
    {
        Schema::dropIfExists('combat_bible_references');
        Schema::dropIfExists('combat_bible_entries');
    }
};
