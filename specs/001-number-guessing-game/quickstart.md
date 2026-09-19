# Quickstart: Number Guessing Game

## Prerequisites

- A modern web browser such as Chrome, Edge, Firefox, or Safari
- Optional: a simple static file server such as VS Code Live Server or `python -m http.server`

## Run the Game

1. Open the project root in a browser.
2. Open `index.html` directly, or serve the folder using a simple static server.
3. Select a screen color theme and difficulty.
4. Press the start button to begin the game.
5. Enter a guess between 1 and 100 and review the feedback message.
6. Continue until the secret number is correctly guessed.
7. Review the win message, attempt total, and saved result history.

## Validate the Core Experience

- Confirm that the start menu includes theme selection, difficulty settings, and a start action.
- Confirm that guesses below the secret number show "Too Low" and above it show "Too High".
- Confirm that the exact match shows "Correct" and triggers the win state.
- Confirm that a completed round shows the attempt count and elapsed time.
- Confirm that result history updates after each win and remains available on replay.
- Confirm that the ranking rule prefers fewer attempts, then shorter time when attempts are tied.

## Expected Outcomes

- The player can complete a round without backend support.
- Results persist in browser storage across sessions.
- The interface stays colorful, readable, and easy to use for repeated play.
