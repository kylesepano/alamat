# Spawn Zone System

Spawn zones connect locations to Nilalang encounters.

Each spawn zone includes:

- location
- monster
- spawn rate
- level range
- weather requirement
- time requirement
- quest requirement
- condition payload

The importer resolves monster references by stable `monster_id`. If generated starter data references a removed duplicate Monster ID, the importer keeps the spawn row by assigning the first canonical Nilalang as a placeholder.
