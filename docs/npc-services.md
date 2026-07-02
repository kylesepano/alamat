# NPC Services

NPC services are stored separately from NPC identity. Supported service concepts include:

- Shop
- Blacksmith
- Crafter
- Healer
- Trainer
- Monster Stable
- Capture Expert
- Appraiser
- Banker
- Courier
- Inn
- Food Stall
- Museum
- Library
- Shrine
- Church
- Mosque
- Festival Booth

Shops and training have their own tables so future runtime code can implement purchases, refreshes, lessons, and requirements without changing the NPC identity schema.
