<?php

namespace Database\Seeders;

use App\Data\GameFoundationData;
use App\Models\Affiliation;
use App\Models\AwakeningLevel;
use App\Models\CombatClass;
use App\Models\GrowthRank;
use App\Models\LoreAge;
use App\Models\NilalangOrder;
use App\Models\Realm;
use App\Models\TrustMethod;
use Illuminate\Database\Seeder;

class FoundationSeeder extends Seeder
{
    public function run(): void
    {
        foreach (GameFoundationData::realms() as $realm) {
            Realm::updateOrCreate(['slug' => $realm['slug']], $realm);
        }

        foreach (GameFoundationData::ages() as $index => $age) {
            unset($age['id']);
            LoreAge::updateOrCreate(['slug' => $age['slug']], [...$age, 'sort_order' => $index + 1]);
        }

        foreach (GameFoundationData::nilalangOrders() as $order) {
            unset($order['id']);
            NilalangOrder::updateOrCreate(['slug' => $order['slug']], $order);
        }

        foreach (GameFoundationData::affiliations() as $affiliation) {
            unset($affiliation['id']);
            Affiliation::updateOrCreate(['slug' => $affiliation['slug']], $affiliation);
        }

        foreach (GameFoundationData::combatClasses() as $combatClass) {
            unset($combatClass['id']);
            CombatClass::updateOrCreate(['slug' => $combatClass['slug']], $combatClass);
        }

        foreach (GameFoundationData::trustMethods() as $trustMethod) {
            unset($trustMethod['id']);
            TrustMethod::updateOrCreate(['slug' => $trustMethod['slug']], $trustMethod);
        }

        foreach (GameFoundationData::growthSystem()['growth_ranks'] as $index => $rank) {
            unset($rank['id']);
            GrowthRank::updateOrCreate(['slug' => $rank['slug']], [...$rank, 'sort_order' => $index + 1]);
        }

        foreach (GameFoundationData::growthSystem()['awakening_levels'] as $level) {
            unset($level['id']);
            AwakeningLevel::updateOrCreate(['slug' => $level['slug']], $level);
        }
    }
}
