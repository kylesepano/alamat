<?php

namespace Database\Seeders;

use App\Services\LibraryService;
use Illuminate\Database\Seeder;

class LibrarySeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            AffiliationSeeder::class,
            CombatClassSeeder::class,
            NilalangOrderSeeder::class,
            PersonalityTraitSeeder::class,
            AiBehaviorSeeder::class,
            TemperamentSeeder::class,
            StatusEffectSeeder::class,
            TrustMethodSeeder::class,
            HabitatSeeder::class,
            WeatherTypeSeeder::class,
            ActiveTimeSeeder::class,
            RarityTierSeeder::class,
            GrowthRankSeeder::class,
            EquipmentCategorySeeder::class,
            ItemCategorySeeder::class,
            SkillCategorySeeder::class,
            TargetTypeSeeder::class,
            DamageTypeSeeder::class,
        ]);

        app(LibraryService::class)->clearCache();
    }
}
