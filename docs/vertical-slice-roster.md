# Vertical Slice Roster

This roster uses existing ALAMAT codex records as the source of truth. It does not create new content records.

Some seed data still has generic production names. The IDs below are the stable source of truth; final display names and narrative copy can be polished later through the codex/localization pipeline.

## Official Slice Premise

The player creates a customizable protagonist and arrives in the Laguna starter area with no Nilalang companion. The opening teaches exploration, movement, interaction, errands, and local stories before the player sees Nilalang as living beings in the world. Bonding unlocks only after the player proves care, restraint, and understanding during the first shrine conflict.

## Player

| Field | Decision |
| --- | --- |
| Protagonist | Customizable |
| Name | Player-entered |
| Appearance | Stored as appearance payload |
| Starting companion | None |
| First bond unlock | After the first shrine/balete story arc |
| Save requirement | Save player name, appearance, position, map, story flags, no-companion state, future companion collection |

## Map Roster

The playable experience should present three player-facing zones, but each zone can use multiple existing location records internally.

| Player-Facing Zone | Source Records | Purpose |
| --- | --- | --- |
| Barangay San Isidro | `WLOC000001` Laguna Starter Barangay, `WLOC000002` Laguna Marketplace, `WLOC000003` Laguna Chapel Courtyard | Character arrival, villagers, movement tutorial, errands, shop/healer/chapel interactions |
| Balete Forest | `WLOC000004` Laguna Balete Forest, `WLOC000005` Laguna River Dock, `WLOC000006` Laguna Mountain Pass | Wild Nilalang, first danger, hidden item, puzzle, route pressure |
| Spirit Shrine | `WLOC000009` Laguna Spirit Realm Threshold | central conflict reveal, first major boss, bond unlock flag |

Deferred from the first playable pass:

- `WLOC000007` Laguna Echo Cave Dungeon
- `WLOC000008` Laguna Coral Reef Route
- `WLOC000010` Laguna Legendary Boss Arena

These records can become optional routes or later expansions. Do not force them into Milestone 1 unless route connectivity requires temporary debug transitions.

## Nilalang Roster

The existing data has only two strict `Common` rarity Nilalang, so the vertical slice uses an early encounter pool made from Common and Uncommon records. This keeps the slice faithful to the current codex.

### Wild Encounter Pool

| Role | ID | Name | Class | Rarity | Why It Fits |
| --- | --- | --- | --- | --- | --- |
| Early household/field encounter | `MON0032` | Duwende | Support | Common | Gentle introduction to unseen household and earth spirits |
| First meaningful helper encounter | `MON0038` | Aghoy | Support | Common | Best candidate for earned first companion |
| Healing grove encounter | `MON0033` | Lambana | Healer | Uncommon | Teaches non-hostile/support Nilalang behavior |
| Trickster route encounter | `MON0027` | Kibaan | Trickster | Uncommon | Supports puzzle and misdirection mechanics |
| Physical forest threat | `MON0028` | Ungo | Warrior | Uncommon | Straightforward combat tutorial encounter |
| Forest confusion encounter | `MON0029` | Tigbalang | Controller | Uncommon | Introduces status/control and route confusion |
| Shrine warning encounter | `MON0012` | Santelmo | Mage | Uncommon | Teaches spirit/fire hazards and night visibility |
| River/old-house threat | `MON0024` | Amalanhig | Tank | Uncommon | Slow durable danger for first defensive lesson |
| Local guardian rare | `MON0031` | Nuno sa Punso | Guardian | Rare | Teaches respect/permission rather than force |
| Balete guardian rare | `MON0003` | Kapre | Guardian | Rare | Iconic major forest presence without making it the first companion |

### First Dangerous Encounter

| ID | Name | Role |
| --- | --- | --- |
| `MON0028` | Ungo | First direct hostile wild encounter in Balete Forest |

### Mini Boss

| ID | Name | Role |
| --- | --- | --- |
| `MON0003` | Kapre | Balete guardian test; should be resolved through restraint, not only damage |

### First Major Boss

| ID | Name | Role |
| --- | --- | --- |
| `MON0007` | Batibat | Shrine/balete nightmare boss representing imbalance, fear, and corrupted rest |

### First Earned Companion Candidate

| ID | Name | Unlock Logic |
| --- | --- | --- |
| `MON0038` | Aghoy | Unlock after helping restore the grove, resolving the first shrine conflict, and choosing a trust-based outcome |

### Non-Companion Spiritual Guide

| ID | Name | Role |
| --- | --- | --- |
| `MON0040` | Umalagad | Appears as ancestral guardian/guide presence; not the starter companion |

## NPC Roster

Use these existing records as the first vertical slice cast. Their final narrative titles can be localized/polished later.

| Role In Slice | Source ID | Current Name | Notes |
| --- | --- | --- | --- |
| Barangay elder / arrival anchor | `NPC000001` | Datu Magsalin | Opens village orientation and local history |
| Movement/interactions guide | `NPC000002` | Lira Lakandula | First errands and interaction tutorial |
| Herbalist/healer role | `NPC000003` | Bayani Kalaw | Introduces healing items and field safety |
| Chapel/community witness | `NPC000004` | Mayumi Bagwis | Frames multiple traditions respectfully |
| Marketplace quest hook | `NPC000005` | Makisig Sikatuna | Introduces shop/economy |
| Forest warning NPC | `NPC000006` | Hiraya Tagapulo | Warns about Balete Forest |
| Field/harvest NPC | `NPC000007` | Tala Dalisay | Rice field/world ecology flavor |
| Balete Grove witness | `NPC000008` | Kidlat Balagtas | Leads into forest rumors |
| Child rumor NPC | `NPC000009` | Mutya Dimalanta | Gentle discovery hook |
| Fisher/river route NPC | `NPC000010` | Sinag Silangan | River dock and route tutorial |
| Babaylan role | `NPC000582` | Lira Dalisay | Spiritual guide for trust/bond unlock |
| Shopkeeper role | `NPC000301` | Datu Magsalin | General store role if NPC/shop data is kept separate |
| Blacksmith role | `NPC000481` | Datu Magsalin | Early equipment tutorial |

Ambient villagers can be filled from `npc_ambient_templates.json`.

## Quest Roster

Use existing quest records as implementation anchors. For Milestone 1, the gameplay should support only the required objective types first: talk, collect, deliver, reach, inspect, defeat, and story flag.

| Beat | Quest ID | Current Title | Purpose |
| --- | --- | --- | --- |
| Arrival/tutorial | `QST000001` | Main Story: River Oath Main Story | Start story, movement/interact tutorial, first errand |
| Village errands | `QST000002` | Main Story: Coral Lantern Main Story | Learn collect/deliver and hear Nilalang stories |
| Chapel/community context | `QST000003` | Main Story: Moon Road Main Story | Introduce choices and local belief diversity |
| Forest warning | `QST000004` | Main Story: Hidden Drum Main Story | Unlock Balete Forest route |
| Shrine conflict | `QST000005` | Main Story: Storm Shrine Main Story | First major boss and bond unlock flag |
| Early side quest | `QST000024` | Side Quest: Hidden Drum Side Quest | Optional village restoration errand |
| Early side quest | `QST000025` | Side Quest: Storm Shrine Side Quest | Optional rumor or offering quest |
| Early side quest | `QST000026` | Side Quest: Ancestor Thread Side Quest | Optional chapel/ancestry context |
| Hidden discovery | `QST000248` | Hidden: Forest Debt Hidden | Hidden forest discovery after first route unlock |
| Future trust hook | `QST000073` | Nilalang Trust: Moon Road Monster Trust | Use as structural reference, but retarget later to `MON0038` if data editing is approved |

Important note: existing monster trust quests currently target later monster IDs. Do not hardcode the first companion quest until we either add a dedicated Aghoy trust quest or approve retargeting an existing trust quest.

## Items

| Use | ID | Name |
| --- | --- | --- |
| Basic healing | `ITM000001` | Healing Herb |
| Rare village reward | `ITM000002` | Diwata Dew |
| Common river/chapele item | `ITM000003` | Sacred River Water |
| Status cure | `ITM000004` | Antidote Leaf |
| Burn/status tutorial | `ITM000005` | Burn Salve |
| Shrine/offering hook | `ITM000006` | Spirit Candle |
| Forest reward | `ITM000008` | Healing Herb 2 |
| Field pickup | `ITM000011` | Antidote Leaf 2 |
| Hidden pickup | `ITM000013` | Spirit Candle 2 |
| Early shop stock | `ITM000018` | Antidote Leaf 3 |

## Equipment

| Use | ID | Name |
| --- | --- | --- |
| Starter weapon option | `EQP000003` | Kris |
| Starter weapon option | `EQP000001` | Bolo |
| First forest reward | `EQP000006` | Spear |
| Shop/blacksmith preview | `EQP000008` | Staff |
| Shrine reward | `EQP000009` | Ritual Dagger |
| Locked/friend reward preview | `EQP000004` | Barong |

## Shops And Crafting

| System | ID | Name | Location |
| --- | --- | --- | --- |
| General store | `SHOPJ00001` | General Store 1 | `WLOC000001` |
| Blacksmith | `SHOPJ00002` | Blacksmith 2 | `WLOC000002` |
| Herbalist | `SHOPJ00003` | Herbalist 3 | `WLOC000003` |
| Cooking station | `CST00001` | Cooking Station 1 | `WLOC000001` |
| Herbalism station | `CST00002` | Herbalism Station 1 | `WLOC000002` |
| Forging station | `CST00003` | Forging Station 1 | `WLOC000003` |

Initial recipes:

- `RCPJ000001` Suman 1
- `RCPJ000002` Burn Salve 1
- `RCPJ000003` Kris 1

## Story Records

| Purpose | ID | Title |
| --- | --- | --- |
| Opening chapter | `STCH001` | Home by the River |
| First trust/bond chapter | `STCH002` | First Oath of Trust |
| Arrival scene | `STSC00001` | Home by the River: Arrival |
| First decision scene | `STSC00002` | Home by the River: Decision |
| Forest trust scene | `STSC00003` | First Oath of Trust: Arrival |
| Bond unlock scene | `STSC00004` | First Oath of Trust: Decision |

Because the player should not start with a companion, `STCH002` should be interpreted as the later earned-bond chapter, not an opening companion grant.

## World Events

| ID | Name | Use |
| --- | --- | --- |
| `WEVENT00001` | Laguna Starter Barangay Event | Rain/weather tutorial and village mood |
| `WEVENT00002` | Laguna Marketplace Event | Marketplace activity/festival spawn scaffold |
| `WEVENT00003` | Laguna Chapel Courtyard Event | Mist/spirit echo foreshadowing |
| `WEVENT00004` | Laguna Balete Forest Event | Forest spawn bonus and danger escalation |

## Encounter Flow

1. Village rumors mention Duwende and Aghoy without combat.
2. First visible Nilalang is `MON0032` Duwende near homes/fields.
3. First forest wild encounter is `MON0028` Ungo.
4. Trickster encounters introduce `MON0027` Kibaan and `MON0029` Tigbalang.
5. `MON0031` Nuno sa Punso introduces respect/permission interaction.
6. Mini boss `MON0003` Kapre blocks deeper forest access.
7. Spirit Shrine reveals corrupted sleep/fear through `MON0007` Batibat.
8. After the boss, `MON0038` Aghoy becomes the first bond candidate if trust conditions are met.

## Bond Unlock Requirements

The first bond system should support multiple future narrative paths, but the vertical slice should test these inputs:

- story flag: `scene_4_seen`
- boss cleared flag: `first_shrine_boss_cleared`
- trust action count with `MON0038`
- non-force choice during the Kapre or Nuno interaction
- Babaylan blessing flag from `NPC000582`

Do not hardcode these only for Aghoy. Store them as generic bond requirement payloads.
