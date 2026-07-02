# Phase K - Story Bible

Phase K adds the canonical narrative layer for ALAMAT. It is a data-driven story bible for writers, quest designers, level designers, artists, programmers, localization, expansions, and sequels.

The story bible keeps ALAMAT fictional and plural: indigenous traditions, oral folklore, regional legends, colonial history, and modern communities can coexist without making one religion or culture the only truth of the setting.

Core files live in `database/data/story`. Run `node tools/generate-phase-k-story.mjs` to regenerate them, then import with `php artisan alamat:import-story`.

Main systems:

- Acts, chapters, and scenes define progression.
- Dialogue nodes, choices, and flags define branching without hardcoded text.
- Timeline and historical events define world history.
- Lore books, folk tales, songs, and poems define optional collectibles.
- Mythology entries define fictional setting rules.
- Character relationships define graph edges between NPCs, Nilalang, factions, and secrets.
- Ending routes and epilogues define route logic and consequences.
- Story asset prompts define cutscene, portrait, banner, storybook, mural, map, memory, festival, and ending art briefs.

Phase K supports future DLC and sequels by adding new JSON records rather than rewriting core code.
