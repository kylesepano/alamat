<?php

namespace App\Data;

class GameFoundationData
{
    public static function all(): array
    {
        return [
            'meta' => self::meta(),
            'world' => self::world(),
            'themes' => self::themes(),
            'realms' => self::realms(),
            'ages' => self::ages(),
            'nilalang_orders' => self::nilalangOrders(),
            'affiliations' => self::affiliations(),
            'combat_classes' => self::combatClasses(),
            'trust_methods' => self::trustMethods(),
            'growth_system' => self::growthSystem(),
        ];
    }

    public static function meta(): array
    {
        return [
            'title' => 'ALAMAT',
            'phase' => 'Phase A: Universe Foundation',
            'genre' => 'Filipino mythology-inspired Nilalang collector RPG',
            'creature_term' => 'Nilalang',
            'recruitment_principle' => 'Players earn trust and bonds. They do not capture Nilalang.',
            'scope_note' => 'This foundation keeps folklore inspiration and original game lore conceptually separate.',
        ];
    }

    public static function world(): array
    {
        return [
            'name' => 'Kapuluan',
            'summary' => 'A fictional archipelago inspired by the Philippines, shaped by maritime routes, mountain settlements, river towns, old kingdoms, sacred groves, colonial-era legends, modern superstition, and Spirit Realm crossings.',
            'regions' => [
                ['id' => 1, 'name' => 'Northern Isles', 'slug' => 'northern-isles', 'description' => 'Highland passes, pine ridges, storm coasts, and ancestor trails where memory is treated as a living duty.'],
                ['id' => 2, 'name' => 'Central Isles', 'slug' => 'central-isles', 'description' => 'Market ports, river deltas, old shrines, festival towns, and forests where mortal roads often bend toward spirit paths.'],
                ['id' => 3, 'name' => 'Southern Isles', 'slug' => 'southern-isles', 'description' => 'Sultanate courts, volcanic islands, sea lanes, moonlit coves, and guarded waters where oath and hospitality carry power.'],
            ],
            'present_conflict' => 'In the Present Age, the ancient balance between humanity and Nilalang is weakening.',
        ];
    }

    public static function themes(): array
    {
        return [
            ['id' => 1, 'name' => 'Harmony', 'slug' => 'harmony', 'description' => 'Balance between mortal need, spirit law, and the living land.'],
            ['id' => 2, 'name' => 'Stewardship', 'slug' => 'stewardship', 'description' => 'Care for places, rites, communities, and beings that cannot be treated as resources alone.'],
            ['id' => 3, 'name' => 'Remembrance', 'slug' => 'remembrance', 'description' => 'The duty to keep names, stories, debts, and ancestral lessons from being erased.'],
            ['id' => 4, 'name' => 'Hope', 'slug' => 'hope', 'description' => 'The belief that broken bonds can be repaired through courage, humility, and action.'],
        ];
    }

    public static function realms(): array
    {
        return [
            ['id' => 1, 'name' => 'Kalangitan', 'slug' => 'kalangitan', 'type' => 'Celestial Realm', 'description' => 'A high realm of sky courts, sun roads, moon houses, omen winds, and distant divine witnesses.'],
            ['id' => 2, 'name' => 'Daigdig', 'slug' => 'daigdig', 'type' => 'Mortal Realm', 'description' => 'The human world of Kapuluan, where settlements, wild places, memory, trade, faiths, and daily survival meet.'],
            ['id' => 3, 'name' => 'Daigdig ng mga Espiritu', 'slug' => 'daigdig-ng-mga-espiritu', 'type' => 'Spirit Realm', 'description' => 'A near and hidden realm of guardians, ancestors, curses, tricksters, lost souls, and powers older than kingdoms.'],
        ];
    }

    public static function ages(): array
    {
        return [
            ['id' => 1, 'title' => 'Age of Dawn', 'slug' => 'age-of-dawn', 'short_description' => 'The world takes shape from sea, sky, ember, and story.', 'long_description' => 'Kapuluan emerges as islands lifted from deep water and wrapped in first winds. The earliest Nilalang walk openly across realm borders, teaching that names, places, and promises have power.'],
            ['id' => 2, 'title' => 'Age of Harmony', 'slug' => 'age-of-harmony', 'short_description' => 'Humans and Nilalang learn the first covenants.', 'long_description' => 'Communities grow beside forests, rivers, mountains, and seas with rites of respect. Bonds are made through offerings, fulfilled duties, healing, and protection rather than ownership.'],
            ['id' => 3, 'title' => 'Age of Kingdoms', 'slug' => 'age-of-kingdoms', 'short_description' => 'Ports, courts, villages, and sacred lineages rise.', 'long_description' => 'Trade routes, sultanates, mountain polities, coastal settlements, and inland barangays develop distinct customs. Some rulers honor spirit law, while others try to bargain with forces they do not fully understand.'],
            ['id' => 4, 'title' => 'Age of Fracture', 'slug' => 'age-of-fracture', 'short_description' => 'Old agreements break under conquest, fear, and forgetting.', 'long_description' => 'Foreign powers, rival houses, corrupted shrines, and wounded habitats strain the covenants. Folklore, faith, superstition, and survival mingle as people reinterpret Nilalang through many lenses.'],
            ['id' => 5, 'title' => 'Present Age', 'slug' => 'present-age', 'short_description' => 'The balance weakens, and forgotten bonds call for repair.', 'long_description' => 'Modern towns and ancient thresholds now overlap. Players enter a Kapuluan where trust must be rebuilt one shrine, habitat, riddle, relic, and personal quest at a time.'],
        ];
    }

    public static function nilalangOrders(): array
    {
        return [
            ['id' => 1, 'name' => 'Espiritu', 'slug' => 'espiritu', 'description' => 'Spirit beings tied to places, memories, weather, omens, or unseen laws.', 'examples' => ['forest wisp', 'river whisper', 'threshold spirit'], 'gameplay_role' => 'Flexible magic and environmental interaction.'],
            ['id' => 2, 'name' => 'Bantay', 'slug' => 'bantay', 'description' => 'Guardians sworn to protect shrines, routes, families, waters, or forbidden ground.', 'examples' => ['shrine sentinel', 'reef watcher', 'ancestral guardian'], 'gameplay_role' => 'Defensive anchors and protection mechanics.'],
            ['id' => 3, 'name' => 'Hayop', 'slug' => 'hayop', 'description' => 'Mythic beasts and animal-shaped powers shaped by habitat, instinct, and legend.', 'examples' => ['storm bird', 'ember boar', 'moon deer'], 'gameplay_role' => 'Physical pressure, mobility, and terrain advantages.'],
            ['id' => 4, 'name' => 'Tao', 'slug' => 'tao', 'description' => 'Human or once-human Nilalang marked by curses, vows, blessings, or unfinished stories.', 'examples' => ['cursed warrior', 'lost bride', 'oathbound sailor'], 'gameplay_role' => 'Quest-heavy allies with tactical specialties.'],
            ['id' => 5, 'name' => 'Kaluluwa', 'slug' => 'kaluluwa', 'description' => 'Souls, ancestors, shades, and revenants whose power comes from remembrance or unrest.', 'examples' => ['ancestor shade', 'wandering soul', 'vengeful echo'], 'gameplay_role' => 'Support, debuffs, memory puzzles, and ritual conditions.'],
            ['id' => 6, 'name' => 'Diyos', 'slug' => 'diyos', 'description' => 'Divine or near-divine beings treated with distance, awe, and narrative restraint.', 'examples' => ['sun emissary', 'moon herald', 'sea-court envoy'], 'gameplay_role' => 'Rare, story-gated beings with powerful covenant requirements.'],
        ];
    }

    public static function affiliations(): array
    {
        return [
            ['id' => 1, 'name' => 'Forest', 'slug' => 'forest', 'description' => 'Groves, canopies, roots, medicinal plants, hidden paths.', 'theme' => 'Stewardship', 'color_hint' => '#2f7d46', 'icon_hint' => 'leaf'],
            ['id' => 2, 'name' => 'Mountain', 'slug' => 'mountain', 'description' => 'Highlands, stone vows, wind passes, old trails.', 'theme' => 'Remembrance', 'color_hint' => '#6d6a4e', 'icon_hint' => 'mountain'],
            ['id' => 3, 'name' => 'River', 'slug' => 'river', 'description' => 'Currents, crossings, trade, cleansing, carried stories.', 'theme' => 'Harmony', 'color_hint' => '#2f8ca3', 'icon_hint' => 'waves'],
            ['id' => 4, 'name' => 'Sea', 'slug' => 'sea', 'description' => 'Reefs, storms, voyages, drowned oaths, horizon roads.', 'theme' => 'Hope', 'color_hint' => '#176b87', 'icon_hint' => 'sailboat'],
            ['id' => 5, 'name' => 'Sky', 'slug' => 'sky', 'description' => 'Winds, birds, omens, lightning, high messages.', 'theme' => 'Harmony', 'color_hint' => '#6096ba', 'icon_hint' => 'cloud-sun'],
            ['id' => 6, 'name' => 'Sacred', 'slug' => 'sacred', 'description' => 'Consecrated sites, vows, taboos, ritual boundaries.', 'theme' => 'Remembrance', 'color_hint' => '#c99a2e', 'icon_hint' => 'sparkles'],
            ['id' => 7, 'name' => 'Shadow', 'slug' => 'shadow', 'description' => 'Fear, secrets, night roads, hidden bargains.', 'theme' => 'Remembrance', 'color_hint' => '#36313d', 'icon_hint' => 'moon'],
            ['id' => 8, 'name' => 'Underworld', 'slug' => 'underworld', 'description' => 'Depths, endings, judgment, buried names.', 'theme' => 'Remembrance', 'color_hint' => '#4a2f35', 'icon_hint' => 'cave'],
            ['id' => 9, 'name' => 'Fire', 'slug' => 'fire', 'description' => 'Volcanoes, hearths, cleansing heat, wrath.', 'theme' => 'Hope', 'color_hint' => '#c74f2f', 'icon_hint' => 'flame'],
            ['id' => 10, 'name' => 'Earth', 'slug' => 'earth', 'description' => 'Soil, harvests, caves, endurance, home ground.', 'theme' => 'Stewardship', 'color_hint' => '#7f5d38', 'icon_hint' => 'sprout'],
            ['id' => 11, 'name' => 'Spirit', 'slug' => 'spirit', 'description' => 'Unseen presence, crossings, dreams, omens.', 'theme' => 'Harmony', 'color_hint' => '#7b5ea7', 'icon_hint' => 'eye'],
            ['id' => 12, 'name' => 'Trickster', 'slug' => 'trickster', 'description' => 'Misdirection, riddles, bargains, reversals.', 'theme' => 'Hope', 'color_hint' => '#d17b40', 'icon_hint' => 'shuffle'],
            ['id' => 13, 'name' => 'Beast', 'slug' => 'beast', 'description' => 'Instinct, wild strength, territory, pursuit.', 'theme' => 'Stewardship', 'color_hint' => '#8a4f2f', 'icon_hint' => 'paw-print'],
            ['id' => 14, 'name' => 'Divine', 'slug' => 'divine', 'description' => 'Awe, cosmic duty, blessing, distance.', 'theme' => 'Harmony', 'color_hint' => '#d6b85a', 'icon_hint' => 'sun'],
            ['id' => 15, 'name' => 'Corruption', 'slug' => 'corruption', 'description' => 'Broken covenants, poisoned places, distorted hunger.', 'theme' => 'Hope', 'color_hint' => '#7a2435', 'icon_hint' => 'skull'],
            ['id' => 16, 'name' => 'Moon', 'slug' => 'moon', 'description' => 'Tides, secrets, cycles, night blessings.', 'theme' => 'Remembrance', 'color_hint' => '#8f94c9', 'icon_hint' => 'moon-star'],
            ['id' => 17, 'name' => 'Sun', 'slug' => 'sun', 'description' => 'Dawn, heat, truth, growth, royal witness.', 'theme' => 'Hope', 'color_hint' => '#e0a12f', 'icon_hint' => 'sunrise'],
            ['id' => 18, 'name' => 'Ancestor', 'slug' => 'ancestor', 'description' => 'Lineage, names, inherited duties, old warnings.', 'theme' => 'Remembrance', 'color_hint' => '#9b6c54', 'icon_hint' => 'scroll'],
        ];
    }

    public static function combatClasses(): array
    {
        return [
            ['id' => 1, 'name' => 'Guardian', 'slug' => 'guardian', 'description' => 'Protects allies through wards, cover, and oath effects.', 'battle_role' => 'Defender', 'stat_focus' => ['defense', 'spirit_resistance']],
            ['id' => 2, 'name' => 'Tank', 'slug' => 'tank', 'description' => 'Absorbs pressure and controls enemy targeting.', 'battle_role' => 'Durable frontline', 'stat_focus' => ['health', 'defense']],
            ['id' => 3, 'name' => 'Warrior', 'slug' => 'warrior', 'description' => 'Reliable martial attacker with balanced offense.', 'battle_role' => 'Melee damage', 'stat_focus' => ['attack', 'health']],
            ['id' => 4, 'name' => 'Berserker', 'slug' => 'berserker', 'description' => 'Trades safety for burst damage and momentum.', 'battle_role' => 'Risk damage', 'stat_focus' => ['attack', 'critical']],
            ['id' => 5, 'name' => 'Ranger', 'slug' => 'ranger', 'description' => 'Uses distance, tracking, and terrain pressure.', 'battle_role' => 'Ranged damage', 'stat_focus' => ['accuracy', 'speed']],
            ['id' => 6, 'name' => 'Assassin', 'slug' => 'assassin', 'description' => 'Strikes exposed targets and punishes openings.', 'battle_role' => 'Precision damage', 'stat_focus' => ['speed', 'critical']],
            ['id' => 7, 'name' => 'Mage', 'slug' => 'mage', 'description' => 'Channels elemental and spiritual force.', 'battle_role' => 'Arcane damage', 'stat_focus' => ['spirit_power', 'focus']],
            ['id' => 8, 'name' => 'Shaman', 'slug' => 'shaman', 'description' => 'Works with rites, spirits, terrain, and cleansing.', 'battle_role' => 'Ritual utility', 'stat_focus' => ['focus', 'spirit_resistance']],
            ['id' => 9, 'name' => 'Healer', 'slug' => 'healer', 'description' => 'Restores allies and mends harmful conditions.', 'battle_role' => 'Recovery', 'stat_focus' => ['spirit_power', 'support']],
            ['id' => 10, 'name' => 'Support', 'slug' => 'support', 'description' => 'Strengthens allies through blessings, chants, and tactical aid.', 'battle_role' => 'Buff utility', 'stat_focus' => ['support', 'focus']],
            ['id' => 11, 'name' => 'Controller', 'slug' => 'controller', 'description' => 'Shapes battle flow through slows, binds, fear, and terrain.', 'battle_role' => 'Field control', 'stat_focus' => ['focus', 'accuracy']],
            ['id' => 12, 'name' => 'Summoner', 'slug' => 'summoner', 'description' => 'Calls temporary aids through pacts and ritual conditions.', 'battle_role' => 'Conjuration utility', 'stat_focus' => ['spirit_power', 'support']],
        ];
    }

    public static function trustMethods(): array
    {
        return [
            ['id' => 1, 'name' => 'Complete personal quest', 'slug' => 'complete-personal-quest', 'description' => 'Resolve a Nilalang-specific story need.', 'example_use_case' => 'Help an oathbound sailor deliver a final message.'],
            ['id' => 2, 'name' => 'Restore shrine', 'slug' => 'restore-shrine', 'description' => 'Repair or cleanse a neglected sacred site.', 'example_use_case' => 'Clear debris and relight a river shrine lantern.'],
            ['id' => 3, 'name' => 'Return sacred relic', 'slug' => 'return-sacred-relic', 'description' => 'Recover an item that belongs to a place, family, or rite.', 'example_use_case' => 'Return a stolen bell to a coastal watch shrine.'],
            ['id' => 4, 'name' => 'Heal corruption', 'slug' => 'heal-corruption', 'description' => 'Remove a harmful distortion from a being or habitat.', 'example_use_case' => 'Cleanse a spring poisoned by broken vows.'],
            ['id' => 5, 'name' => 'Give offering', 'slug' => 'give-offering', 'description' => 'Offer appropriate gifts with respect and context.', 'example_use_case' => 'Leave woven rice cakes and fresh water at a forest threshold.'],
            ['id' => 6, 'name' => 'Defeat honorably', 'slug' => 'defeat-honorably', 'description' => 'Win a trial without cruelty or exploitation.', 'example_use_case' => 'Best a guardian in a duel and spare its sacred ground.'],
            ['id' => 7, 'name' => 'Solve ancestral riddle', 'slug' => 'solve-ancestral-riddle', 'description' => 'Use remembered stories to answer a test.', 'example_use_case' => 'Name the forgotten founder of a mountain path.'],
            ['id' => 8, 'name' => 'Protect habitat', 'slug' => 'protect-habitat', 'description' => 'Defend the place that sustains the Nilalang.', 'example_use_case' => 'Stop illegal burning near a nesting grove.'],
            ['id' => 9, 'name' => 'Help related NPC', 'slug' => 'help-related-npc', 'description' => 'Aid a person connected to the Nilalang story.', 'example_use_case' => 'Protect a fisher family watched by a reef spirit.'],
            ['id' => 10, 'name' => 'Complete ritual condition', 'slug' => 'complete-ritual-condition', 'description' => 'Fulfill a specific symbolic or timed requirement.', 'example_use_case' => 'Speak a vow at low tide beneath the new moon.'],
        ];
    }

    public static function growthSystem(): array
    {
        return [
            'principle' => 'Nilalang do not evolve into different species. Growth improves stats, deepens bonds, and unlocks visual upgrades while preserving identity.',
            'growth_ranks' => [
                ['id' => 1, 'rank' => 'D', 'slug' => 'rank-d', 'description' => 'New bond, basic stat growth, first field interactions.'],
                ['id' => 2, 'rank' => 'C', 'slug' => 'rank-c', 'description' => 'Trusted companion, improved reliability, minor visual detail.'],
                ['id' => 3, 'rank' => 'B', 'slug' => 'rank-b', 'description' => 'Battle-ready ally with stronger role identity.'],
                ['id' => 4, 'rank' => 'A', 'slug' => 'rank-a', 'description' => 'Mature bond with advanced abilities and visible aura changes.'],
                ['id' => 5, 'rank' => 'S', 'slug' => 'rank-s', 'description' => 'Heroic trust level tied to major quest milestones.'],
                ['id' => 6, 'rank' => 'SS', 'slug' => 'rank-ss', 'description' => 'Legendary bond with rare visual and tactical upgrades.'],
                ['id' => 7, 'rank' => 'SSS', 'slug' => 'rank-sss', 'description' => 'Mythic resonance reserved for exceptional covenant completion.'],
            ],
            'awakening_levels' => [
                ['id' => 1, 'stars' => 1, 'slug' => 'awakening-1', 'description' => 'First sign of awakened trust.'],
                ['id' => 2, 'stars' => 2, 'slug' => 'awakening-2', 'description' => 'Small stat and field utility increase.'],
                ['id' => 3, 'stars' => 3, 'slug' => 'awakening-3', 'description' => 'New passive or improved role expression.'],
                ['id' => 4, 'stars' => 4, 'slug' => 'awakening-4', 'description' => 'Visible upgrade and stronger bond response.'],
                ['id' => 5, 'stars' => 5, 'slug' => 'awakening-5', 'description' => 'High covenant state with major combat utility.'],
                ['id' => 6, 'stars' => 6, 'slug' => 'awakening-6', 'description' => 'Peak awakening for the same Nilalang species.'],
            ],
        ];
    }
}
