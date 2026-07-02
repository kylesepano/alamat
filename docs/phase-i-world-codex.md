# ALAMAT Phase I: World Codex

Phase I adds a scalable world/location architecture for regions, provinces, towns, barangays, routes, dungeons, shrines, forests, rivers, caves, reefs, interiors, fast travel, weather zones, spawn zones, NPC placements, quest markers, world events, and map asset prompts.

Included:

- 17 world regions
- 17 province hooks
- 170 starter locations
- 51 routes
- 51 interiors
- 34 dungeons and boss arenas
- 51 fast travel points
- 170 map transitions
- 119 spawn zones
- 170 weather zones
- 170 NPC placements
- 170 world quest markers
- 80 world events
- 170 map asset prompt records

Commands:

```bash
node tools/generate-phase-i-world.mjs
php artisan migrate
php artisan alamat:validate-world
php artisan alamat:import-world
```

API:

- `GET /api/world/regions`
- `GET /api/world/provinces`
- `GET /api/world/locations`
- `GET /api/world/locations/{location_id}`
- `GET /api/world/locations/slug/{slug}`
- `GET /api/world/locations/type/{type}`
- `GET /api/world/routes`
- `GET /api/world/spawns/{location_id}`
- `GET /api/world/npcs/{location_id}`
- `GET /api/world/fast-travel`
- `GET /api/world/events`
- `GET /api/world-codex/summary`

Not implemented yet:

- Tilemap renderer
- Pathfinding runtime
- Actual fast-travel transaction flow
- Dynamic weather simulation
- Full world-map UI
