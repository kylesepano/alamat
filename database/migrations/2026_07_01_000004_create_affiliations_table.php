<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('affiliations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('slug')->unique();
            $table->text('description');
            $table->string('theme');
            $table->string('color_hint', 16);
            $table->string('icon_hint');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('affiliations');
    }
};
