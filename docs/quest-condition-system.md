# Quest Condition System

Quest conditions are stored as JSONB payloads:

- `start_condition_payload`
- `failure_condition_payload`
- `completion_condition_payload`
- `quest_requirements.requirement_payload`
- `quest_markers.condition_payload`

Supported concepts include player level, story chapter, completed quest, failed quest, faction reputation, NPC relationship, Nilalang trust, weather, terrain, active time, inventory item, equipped item, captured Nilalang, party Nilalang, dialogue choice, and hidden flags.
