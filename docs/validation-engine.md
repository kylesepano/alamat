# Validation Engine

Run validation:

```bash
php artisan alamat:production:validate all
```

Reports are written to:

- `storage/validation_reports/*.json`
- `storage/validation_reports/*.html`

Current checks include valid JSON, duplicate primary IDs, and duplicate slugs. The validation rule manifest lives in `database/validation_rules/production_validation_rules.json` and is designed to expand into asset, quest-chain, schedule, recipe, map transition, spawn, and circular-reference checks.
