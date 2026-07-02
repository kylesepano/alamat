# Modding Guide

Mod support is scaffolded through `production_mod_packs`.

Future external JSON packs can target:

- Nilalang
- NPCs
- items
- equipment
- quests
- maps
- dialogue

Mod packs should validate before loading and should never mutate core source JSON directly. The intended workflow is validate, stage, import into isolated records, then enable.
