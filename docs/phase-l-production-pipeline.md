# Phase L - Production Pipeline & Developer Tools

Phase L creates ALAMAT's internal production platform. It is not player-facing. It gives developers, writers, designers, artists, QA, and future localization/modding workflows a shared operational layer.

Major systems:

- Import pipeline wrappers for every codex.
- Export jobs for JSON, CSV, SQL placeholder, and Markdown.
- Validation engine with JSON and HTML reports.
- Asset registry and prompt records.
- Localization string table.
- Versioned save schema metadata.
- Developer command logging restricted to development environments.
- QA, build, analytics, and mod pack scaffolding.
- React production dashboard.

The production platform is intentionally generic. It references codex names and external IDs so future expansions can add content without changing core tooling.
