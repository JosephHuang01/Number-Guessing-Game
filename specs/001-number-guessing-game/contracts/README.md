# Contracts: Number Guessing Game

This project does not expose a remote API or external service contract. The browser-side contract is limited to the in-browser game state and local persistence layer.

## Browser Storage Contract

**Storage key**: `numberGuessingGameResults`

**Type**: array of result objects

**Result object shape**:

```json
{
  "id": "string",
  "attempts": 6,
  "elapsedMs": 42000,
  "completedAt": "2026-09-19T12:00:00Z",
  "difficulty": "easy",
  "theme": "sunset"
}
```

## Behavioral Contract

- A new result is appended after a win.
- Results are sorted by fewest attempts, then by shortest elapsed time.
- Invalid or duplicate guesses do not create a new persisted result.
- The interface updates the visible history immediately after a valid completion.
