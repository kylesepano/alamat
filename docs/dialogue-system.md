# Dialogue System

Story dialogue is stored in `dialogues` and `dialogue_choices`.

Each dialogue node supports:

- speaker
- portrait
- emotion
- text
- voice cue
- animation cue
- player choices
- conditions
- consequences
- localization key
- voice direction notes

Choices use value axes such as Mercy, Justice, Curiosity, Wisdom, Duty, Compassion, Honor, Tradition, Balance, and Sacrifice. The system avoids binary good/evil logic and lets choices affect trust, reputation, quest routes, endings, unlocks, shops, crafting, and world state.

Dialogue text should not be hardcoded in React or PHP. Pages should load dialogue through `/api/story/dialogues`.
