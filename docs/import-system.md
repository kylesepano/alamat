# Import System

Phase L wraps the existing codex importers with production job tracking.

Commands:

```bash
php artisan alamat:import:monsters
php artisan alamat:import:items
php artisan alamat:import:equipment
php artisan alamat:import:npcs
php artisan alamat:import:quests
php artisan alamat:import:world
php artisan alamat:import:story
```

Use `--dry-run` to validate without committing codex content. Production job records are stored in `production_import_jobs`.

The pipeline records command output, status, options, errors, start time, and finish time.
