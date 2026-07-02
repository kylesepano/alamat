# Map Transition System

Map transitions connect one location to another.

Transition gates can include:

- required quest
- required item
- required level
- active time
- coordinate payloads

Future map/runtime code should evaluate `condition_payload` before moving the player.
