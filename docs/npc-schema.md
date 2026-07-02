# NPC Schema

Primary tables:

- `npc_categories`
- `npc_roles`
- `npc_professions`
- `npc_factions`
- `npc_personalities`
- `npc_relationship_levels`
- `npcs`
- `npc_locations`
- `npc_schedules`
- `npc_dialogues`
- `npc_dialogue_conditions`
- `npc_services`
- `npc_shops`
- `npc_inventory`
- `npc_quests`
- `npc_training`
- `npc_portraits`
- `npc_voice_profiles`
- `npc_asset_prompts`
- `npc_ambient_templates`

NPC identity is stable through `npc_id` and `slug`. Runtime systems should reference NPCs by those stable identifiers, not by database IDs.

The `availability_payload` field is an intentional extension point for story chapters, weather gates, festival-only appearances, and faction reputation requirements.

`npc_ambient_templates` supports unnamed crowd and town NPC spawning without bloating the named NPC Codex.
