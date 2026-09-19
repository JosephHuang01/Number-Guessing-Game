# Data Model: Number Guessing Game

## Entity Overview

### GameSettings
Represents the player-selected configuration for a single session.

**Fields**
- `theme`: string — selected screen color theme
- `difficulty`: string — `easy`, `medium`, or `hard`
- `startedAt`: number or ISO timestamp — session start time

**Validation Rules**
- `theme` must be one of the supported theme options
- `difficulty` must be one of the allowed values
- `startedAt` must be present when a round begins

### GameRound
Represents one complete playthrough of the guessing game.

**Fields**
- `id`: string — unique round identifier
- `secretNumber`: number — target value between 1 and 100
- `attempts`: number — number of guesses used before the win
- `status`: string — `in_progress` or `won`
- `startedAt`: number or ISO timestamp — round start time
- `endedAt`: number or ISO timestamp — round completion time
- `elapsedMs`: number — total time used to complete the round

**Validation Rules**
- `secretNumber` must be an integer from 1 to 100
- `attempts` must be a positive integer
- `status` must be `won` for a completed round
- `elapsedMs` must be greater than or equal to zero

### ResultEntry
Represents a finished result that is persisted for comparison with future attempts.

**Fields**
- `id`: string — unique result identifier
- `attempts`: number — total attempts used
- `elapsedMs`: number — completion time in milliseconds
- `completedAt`: number or ISO timestamp — when the round was completed
- `difficulty`: string — selected difficulty level
- `theme`: string — selected visual theme

**Validation Rules**
- `attempts` must be greater than zero
- `elapsedMs` must be greater than zero
- `difficulty` must be one of the supported difficulty values

## Relationships

- One `GameSettings` instance organizes one `GameRound`.
- One `GameRound` can be converted into one `ResultEntry` after a successful win.
- Multiple `ResultEntry` records are stored together in a ranked history list.

## State Transitions

1. Start menu -> choose theme and difficulty -> create `GameSettings`
2. Start round -> generate `GameRound` with secret number
3. Player submit guess -> update `attempts` and feedback state
4. Correct guess -> set `status` to `won`, compute `elapsedMs`, create `ResultEntry`
5. Save result -> append to history and re-rank list

## Persistence Contract

The application can persist a collection of `ResultEntry` records under a browser storage key such as `numberGuessingGameResults`.

**Example shape**

```json
[
  {
    "id": "2026-09-19T12:00:00Z-1",
    "attempts": 6,
    "elapsedMs": 42000,
    "completedAt": "2026-09-19T12:00:00Z",
    "difficulty": "medium",
    "theme": "sunset"
  }
]
```
