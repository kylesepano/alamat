# Save System

Phase L defines versioned save metadata in `production_save_versions`.

Tracked save domains:

- story progress
- quests
- inventory
- equipment
- Nilalang collection
- Nilalang trust
- NPC relationships
- world state
- faction reputation
- settings

Future migrations should add records with `save_version`, `schema_payload`, and `migration_payload`.
