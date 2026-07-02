<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('production_import_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_id')->unique();
            $table->string('codex')->index();
            $table->string('source_path')->nullable();
            $table->string('status')->default('pending')->index();
            $table->boolean('dry_run')->default(true);
            $table->jsonb('options_payload')->nullable();
            $table->jsonb('summary_payload')->nullable();
            $table->jsonb('errors_payload')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_export_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('job_id')->unique();
            $table->string('codex')->index();
            $table->string('format')->index();
            $table->jsonb('filters_payload')->nullable();
            $table->string('output_path')->nullable();
            $table->string('status')->default('pending')->index();
            $table->jsonb('summary_payload')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_validation_reports', function (Blueprint $table) {
            $table->id();
            $table->string('report_id')->unique();
            $table->string('scope')->index();
            $table->string('status')->default('pending')->index();
            $table->jsonb('rules_payload');
            $table->jsonb('summary_payload')->nullable();
            $table->jsonb('issues_payload')->nullable();
            $table->string('json_report_path')->nullable();
            $table->string('html_report_path')->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_assets', function (Blueprint $table) {
            $table->id();
            $table->string('asset_id')->unique();
            $table->string('asset_type')->index();
            $table->string('owner_type')->nullable()->index();
            $table->string('owner_id')->nullable()->index();
            $table->string('filename');
            $table->string('version')->default('1.0.0');
            $table->string('status')->default('placeholder')->index();
            $table->text('generation_prompt')->nullable();
            $table->string('approval_status')->default('pending')->index();
            $table->string('artist')->nullable();
            $table->date('creation_date')->nullable();
            $table->timestamp('last_modified')->nullable();
            $table->jsonb('metadata_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('production_prompt_records', function (Blueprint $table) {
            $table->id();
            $table->string('prompt_id')->unique();
            $table->string('prompt_type')->index();
            $table->string('owner_type')->index();
            $table->string('owner_id')->index();
            $table->string('version')->default('1.0.0');
            $table->text('prompt');
            $table->text('negative_prompt')->nullable();
            $table->string('seed_key')->nullable();
            $table->jsonb('parameters_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('production_localization_strings', function (Blueprint $table) {
            $table->id();
            $table->string('translation_key')->index();
            $table->string('language_code')->index();
            $table->string('category')->index();
            $table->text('source_text')->nullable();
            $table->text('translated_text')->nullable();
            $table->string('status')->default('draft')->index();
            $table->string('context')->nullable();
            $table->jsonb('metadata_payload')->nullable();
            $table->timestamps();
            $table->unique(['translation_key', 'language_code']);
        });

        Schema::create('production_save_versions', function (Blueprint $table) {
            $table->id();
            $table->string('save_version')->unique();
            $table->jsonb('schema_payload');
            $table->jsonb('migration_payload')->nullable();
            $table->boolean('is_current')->default(false);
            $table->timestamps();
        });

        Schema::create('production_qa_reports', function (Blueprint $table) {
            $table->id();
            $table->string('qa_report_id')->unique();
            $table->string('suite')->index();
            $table->string('status')->default('pending')->index();
            $table->jsonb('checks_payload');
            $table->jsonb('issues_payload')->nullable();
            $table->string('report_path')->nullable();
            $table->timestamp('generated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_build_runs', function (Blueprint $table) {
            $table->id();
            $table->string('build_id')->unique();
            $table->string('environment')->index();
            $table->string('status')->default('pending')->index();
            $table->string('version_stamp')->nullable();
            $table->jsonb('manifest_payload')->nullable();
            $table->jsonb('steps_payload')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_analytics_events', function (Blueprint $table) {
            $table->id();
            $table->string('event_id')->unique();
            $table->string('event_type')->index();
            $table->string('subject_type')->nullable()->index();
            $table->string('subject_id')->nullable()->index();
            $table->jsonb('payload')->nullable();
            $table->boolean('opt_in')->default(true);
            $table->timestamp('occurred_at')->nullable();
            $table->timestamps();
        });

        Schema::create('production_mod_packs', function (Blueprint $table) {
            $table->id();
            $table->string('pack_id')->unique();
            $table->string('name');
            $table->string('version')->default('1.0.0');
            $table->string('author')->nullable();
            $table->jsonb('allowed_content_payload');
            $table->string('status')->default('disabled')->index();
            $table->jsonb('validation_payload')->nullable();
            $table->timestamps();
        });

        Schema::create('production_console_logs', function (Blueprint $table) {
            $table->id();
            $table->string('command_id')->unique();
            $table->string('command')->index();
            $table->jsonb('payload')->nullable();
            $table->string('environment')->default('local')->index();
            $table->string('status')->default('simulated')->index();
            $table->timestamp('executed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        foreach ([
            'production_console_logs', 'production_mod_packs', 'production_analytics_events', 'production_build_runs',
            'production_qa_reports', 'production_save_versions', 'production_localization_strings',
            'production_prompt_records', 'production_assets', 'production_validation_reports',
            'production_export_jobs', 'production_import_jobs',
        ] as $table) {
            Schema::dropIfExists($table);
        }
    }
};
