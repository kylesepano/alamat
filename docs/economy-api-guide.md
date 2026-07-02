# Economy API Guide

Read endpoints expose currencies, stations, recipes, shops, inventories, trade routes, festival markets, and economy events.

Write endpoints currently return simulated responses:

- `POST /api/economy/craft/{recipe_id}`
- `POST /api/economy/buy`
- `POST /api/economy/sell`
- `POST /api/economy/barter`

These endpoints are intentionally scaffolded until player inventory, wallets, and save-game state exist.
