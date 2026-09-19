# Number Guessing Game Constitution

## Core Principles

### I. Static-First
This project must remain a static web game that runs entirely in the browser with HTML, CSS, and JavaScript. No backend, database, or server-side logic is required for core gameplay.

### II. Simple Gameplay
The game must have a clear objective: pick a number, receive feedback, track attempts, and allow replay. Features must stay minimal and directly support the guessing loop.

### III. Test-First (NON-NEGOTIABLE)
Any change to game rules or logic must be validated with a failing or focused check before implementation. Core behavior such as the random range, guess comparison, and reset flow must be covered by minimal automated tests or manual verification.

### IV. Accessibility and Clarity
The game must be readable, usable, and understandable without unnecessary complexity. Labels, status messages, and interaction states must be clear to both sighted and keyboard users.

### V. Maintainability
Keep logic small, functions focused, and code easy to reason about. Avoid unnecessary frameworks, large abstractions, or premature optimization.

## Additional Constraints

This project is intentionally limited to a browser-based static app. It must not depend on external services, build tooling, or package installation for the basic experience. Assets should be lightweight, locally hosted, and easy to open from disk or a static server.

## Development Workflow

All work must follow the smallest viable path: implement the necessary feature, validate the behavior, and keep the codebase simple. Changes should be reviewed against the game requirements and the constitution before merging.

## Governance

This constitution governs all work in the project. Any feature or refactor that adds complexity beyond a minimal static web game must be justified explicitly and kept to the smallest possible scope.

**Version**: 1.0.0 | **Ratified**: 2026-09-19 | **Last Amended**: 2026-09-19
