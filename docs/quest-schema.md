# Quest Schema

Primary tables:

- `quest_categories`
- `quest_types`
- `quest_statuses`
- `quests`
- `quest_steps`
- `quest_objectives`
- `quest_rewards`
- `quest_requirements`
- `quest_dialogues`
- `quest_flags`
- `quest_branches`
- `quest_chains`
- `quest_markers`
- `quest_asset_prompts`
- `quest_player_progress`

Quests reference NPCs, Nilalang, factions, locations, items, equipment, and previous quests through stable import IDs resolved by the importer. Runtime systems should use `quest_id` or `slug` as external references.
