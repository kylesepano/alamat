<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(FoundationSeeder::class);
        $this->call(LibrarySeeder::class);
        $this->call(CombatBibleSeeder::class);
        $this->call(ItemSeeder::class);
        $this->call(EquipmentSeeder::class);
        $this->call(NPCSeeder::class);
        $this->call(QuestSeeder::class);
        $this->call(WorldSeeder::class);
        $this->call(EconomySeeder::class);
        $this->call(StorySeeder::class);
        $this->call(ProductionSeeder::class);
    }
}
