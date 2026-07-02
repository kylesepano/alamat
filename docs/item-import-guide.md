# Item Import Guide

Import all items:

```bash
php artisan alamat:import-items --generate-prompts
```

Dry-run validation:

```bash
php artisan alamat:validate-items
```

Import a specific file:

```bash
php artisan alamat:import-items --file=consumables.json --generate-prompts
```

The importer uses `updateOrCreate` by `item_id`, so reruns update existing records instead of duplicating them.

After importing, sync generated monster drops:

```bash
php artisan alamat:sync-monster-drops
```
