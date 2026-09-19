# Research: Number Guessing Game

## Decision 1: Use a single-page static browser interface

**Decision**: The game will be implemented as a single HTML page with CSS for styling and JavaScript for game rules, UI updates, and local persistence.

**Rationale**: This aligns with the project constitution, keeps the app lightweight, and satisfies the requirement for a website that runs entirely in the browser without a backend.

**Alternatives considered**:
- Multi-page application: Rejected because it adds unnecessary complexity for a small game loop.
- Framework-based app: Rejected because the project does not require routing, state management, or build tooling.

## Decision 2: Persist results in browser local storage

**Decision**: Completed game results will be saved in local browser storage so they remain available across replay sessions on the same device/browser.

**Rationale**: The requirement states that results should be saved and compared across future attempts, and the project constitution permits browser-only persistence.

**Alternatives considered**:
- Backend database: Rejected because it would violate the static-first principle.
- Cookie-only storage: Rejected because it is less robust and less suitable for structured score records.

## Decision 3: Use a deterministic ranking rule with attempt count first

**Decision**: Results will be ranked by fewest attempts first; if attempts tie, the shortest completion time wins.

**Rationale**: This directly matches the feature specification and gives players a clear, fair leaderboard behavior.

**Alternatives considered**:
- Time-first ranking: Rejected because it contradicts the stated requirement.
- Randomized ordering: Rejected because it would not provide meaningful comparison.

## Decision 4: Difficulty affects challenge intensity without changing the base range

**Decision**: Easy, medium, and hard modes will affect how the game presents challenge, while the core random range stays at 1 to 100.

**Rationale**: The spec allows the menu to include difficulty modes and keeps the game consistent while simplifying the design. This avoids unnecessary rule complexity.

**Alternatives considered**:
- Different number ranges per difficulty: Rejected because the feature description emphasizes a standard range and does not require distinct ranges.
- Difficulty hidden from the UI: Rejected because the feature explicitly requires difficulty selection.

## Open assumptions resolved

- Invalid guesses are rejected without ending the round.
- Duplicate guesses count as repeated attempts rather than a valid new strategic move.
- A new game can begin by overriding the previous unfinished session.
- History is browser-local and not shared across users or devices.
