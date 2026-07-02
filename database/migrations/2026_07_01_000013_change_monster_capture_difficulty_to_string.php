<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasTable('monsters') && Schema::hasColumn('monsters', 'capture_difficulty')) {
            if (DB::getDriverName() === 'pgsql') {
                DB::statement('ALTER TABLE monsters ALTER COLUMN capture_difficulty TYPE varchar(255) USING capture_difficulty::varchar');
            }
        }
    }

    public function down(): void
    {
        //
    }
};
