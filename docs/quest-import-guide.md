# Quest Import Guide

Generate seed data:

```bash
node tools/generate-phase-h-quests.mjs
```

Validate:

```bash
php artisan alamat:validate-quests
```

Import:

```bash
php artisan alamat:import-quests
```

The importer uses `updateOrCreate` by stable IDs. Rerunning imports updates existing quests, steps, rewards, branches, chains, and prompts without duplication.
