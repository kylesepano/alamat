# NPC Dialogue System

Dialogue is stored in `npc_dialogues` as JSON tree nodes and linked to `npc_dialogue_conditions`.

Condition payloads can reference:

- weather
- season
- quest progress
- relationship level
- player reputation
- story chapter
- current festival
- equipped Nilalang
- equipped item
- equipped relic
- player affiliation

The current Phase G API returns the dialogue tree through `GET /api/npcs/dialogue/{npc_id}`. Future runtime code should evaluate conditions by priority and fall back to `fallback_line`.
