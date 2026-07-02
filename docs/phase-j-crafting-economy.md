# ALAMAT Phase J: Crafting & Economy Codex

Phase J adds a scalable crafting and economy framework for recipes, stations, shops, currencies, regional prices, barter rules, trade routes, festival markets, and economy events.

Included:

- 6 currencies
- 56 crafting stations
- 14 recipe categories
- 168 recipes
- 504 recipe ingredients
- 80 shops
- 320 shop inventory rows
- 80 vendor profiles
- 60 regional price modifiers
- 60 barter rules
- 50 trade routes
- 20 festival markets
- 40 economy events
- 230 economy asset prompt records

Commands:

```bash
node tools/generate-phase-j-economy.mjs
php artisan migrate
php artisan alamat:validate-economy
php artisan alamat:import-economy
```

API:

- `GET /api/economy/currencies`
- `GET /api/economy/stations`
- `GET /api/economy/recipes`
- `GET /api/economy/recipes/{recipe_id}`
- `GET /api/economy/shops`
- `GET /api/economy/shops/{shop_id}`
- `GET /api/economy/shops/{shop_id}/inventory`
- `GET /api/economy/trade-routes`
- `GET /api/economy/festival-markets`
- `POST /api/economy/craft/{recipe_id}`
- `POST /api/economy/buy`
- `POST /api/economy/sell`
- `POST /api/economy/barter`

Not implemented yet:

- Player inventory transactions
- Save-game wallets
- Real purchase/sell mutation
- Crafting success rolls
- Dynamic market simulation
