# Story Schema

Source JSON is stored in `database/data/story`.

Primary progression:

- `story_acts.json`
- `story_chapters.json`
- `story_scenes.json`
- `cutscenes.json`
- `cinematics.json`

Dialogue and choice:

- `dialogues.json`
- `dialogue_choices.json`
- `dialogue_flags.json`

Lore and history:

- `lore_books.json`
- `folk_tales.json`
- `songs.json`
- `poems.json`
- `timeline.json`
- `historical_events.json`
- `world_history.json`
- `mythology.json`

Endings and graph data:

- `character_relationships.json`
- `ending_routes.json`
- `epilogues.json`
- `story_asset_prompts.json`

Every table uses a human-readable external ID, such as `STACT001`, `STCH001`, `STSC00001`, or `END001`, so content can reference records safely across exports, imports, and localization tools.
