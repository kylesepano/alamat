<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('library_status_effects') && Schema::hasColumn('library_status_effects', 'default_duration')) {
            if (DB::getDriverName() === 'pgsql') {
                DB::statement('ALTER TABLE library_status_effects ALTER COLUMN default_duration TYPE varchar(255) USING default_duration::varchar');
            }
        }
    }

    public function down(): void
    {
        //
    }
};
