# Asset Pipeline

Production assets are tracked in `production_assets`.

Each asset includes:

- asset ID
- filename
- version
- status
- generation prompt
- approval status
- artist
- creation date
- last modified timestamp

Statuses include placeholder, AI generated, reviewed, approved, and deprecated. Prompt records are stored separately in `production_prompt_records` so prompts can be reproduced and versioned.
