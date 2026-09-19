# Tasks: Number Guessing Game

**Input**: Design documents from `/specs/001-number-guessing-game/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the static web app shell and project structure

- [X] T001 Create project root structure and confirm required files: `index.html`, `styles.css`, `script.js`, and `specs/001-number-guessing-game/`
- [X] T002 Create the static page scaffold in `index.html` with semantic structure for menu, game panel, result history, and status messaging
- [X] T003 [P] Create the base visual theme system in `styles.css` with layout, spacing, color variables, and responsive styling
- [X] T004 [P] Create a minimal JavaScript bootstrap in `script.js` to initialize UI state, theme defaults, and local storage access

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core game state, persistence, and ranking logic that must be complete before story work can proceed

**⚠️ CRITICAL**: No user story work can begin until this phase is complete**

- [X] T005 Define the core game state model in `script.js` for selected theme, difficulty, secret number, attempts, timer, and current status
- [X] T006 Implement the browser local storage helper in `script.js` to read and write persisted results and keep the saved history list valid
- [X] T007 Implement the result ranking algorithm in `script.js` with the rule: fewest attempts first, and if attempts tie, shortest elapsed time wins
- [X] T008 [P] Define difficulty presets and theme options in `script.js` so `easy`, `medium`, and `hard` modes are consistent across the UI and scoring flow
- [X] T009 [P] Add validation helpers in `script.js` for guess range checks, duplicate detection, and invalid input rejection without breaking the round
- [X] T010 Create the round lifecycle logic in `script.js` to start, track, and complete a game while updating attempts and elapsed time

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Start a game from a welcoming menu (Priority: P1) 🎯 MVP

**Goal**: Allow players to open the game, adjust the color theme, select a difficulty, and start the round.

**Independent Test**: Open the page, choose a theme and difficulty, and confirm the game starts from the menu with the expected configuration.

### Implementation for User Story 1

- [X] T011 [P] [US1] Build the start menu UI in `index.html` with theme controls, difficulty controls, and the start button
- [X] T012 [P] [US1] Wire menu interactions in `script.js` so theme and difficulty selections update the active game state before start
- [X] T013 [US1] Implement the start-game action in `script.js` to initialize a new round, set the secret number, reset timer and attempts, and switch from the menu to the active gameplay view
- [X] T014 [US1] Add display state updates in `script.js` to show the chosen difficulty and a live round status message within the gameplay panel
- [X] T015 [US1] Validate the menu-to-game flow in the browser by confirming that the menu can launch a playable round and the selected settings persist for that session

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Make a guess and receive immediate feedback (Priority: P1)

**Goal**: Accept guesses, compare them to the secret number, and return the correct status message for each attempt.

**Independent Test**: Submit guesses above, below, and equal to the secret number and verify the displayed feedback matches the exact requirement: "Too High", "Too Low", or "Correct".

### Implementation for User Story 2

- [X] T016 [P] [US2] Add the guess input and submission controls to `index.html` and ensure the display remains readable without taking over the screen
- [X] T017 [P] [US2] Implement guess submission logic in `script.js` to validate the number range, prevent invalid input, and count attempts correctly
- [X] T018 [US2] Add the comparison logic in `script.js` to distinguish between lower, higher, and exact guesses and update the round state accordingly
- [X] T019 [US2] Render the feedback result text in the UI with the exact user-facing states: "Too High", "Too Low", and "Correct"
- [X] T020 [US2] Confirm the game loop works by retrying the same interaction with multiple guesses and checking that the message and attempt count remain accurate

**Checkpoint**: At this point, User Story 2 should be independently functional and complete

---

## Phase 5: User Story 3 - Complete a round and compare results over time (Priority: P1)

**Goal**: Celebrate the win, store the result, and rank future wins against earlier attempts using the required scoring algorithm.

**Independent Test**: Complete multiple rounds, save the results, and verify ranking prefers fewer attempts first and then shorter completion time when attempts tie.

### Implementation for User Story 3

- [X] T021 [P] [US3] Add the end-of-round win panel to `index.html` with prominent congratulatory text, attempt count, completion time, and replay controls
- [X] T022 [P] [US3] Implement the completion flow in `script.js` to calculate elapsed time, finalize the round, and trigger the celebratory state when the correct guess is made
- [X] T023 [US3] Save the completed result entry in browser storage in `script.js` using the persisted structure defined in `specs/001-number-guessing-game/data-model.md`
- [X] T024 [US3] Re-rank the saved result history in `script.js` according to the rule: fewest attempts first; if attempts tie, shortest elapsed time wins
- [X] T025 [US3] Add replay handling in `script.js` so the player can start another round without losing prior history and can compare the latest result against earlier attempts
- [X] T026 [US3] Validate the complete win-and-history flow manually in the browser by replaying the game at least twice and confirming ranking order and result persistence

**Checkpoint**: At this point, all primary gameplay and persistence requirements should be independently functional

---

## Phase 6: User Story 4 - Secondary polish and usability refinements (Priority: P2)

**Goal**: Improve clarity, readability, and game feel without changing the core game rules.

**Independent Test**: The interface remains visually engaging, readable, and easy to use across repeated rounds and different theme selections.

### Implementation for User Story 4

- [X] T027 [P] [US4] Refine the color and contrast choices in `styles.css` so the interface is colorful, accessible, and legible for players of different ages and skill levels
- [X] T028 [US4] Improve display sizing for the secret number and feedback state in `styles.css` to make the numerical value readable without dominating the UI
- [X] T029 [US4] Verify the round states and message timing in `script.js` to ensure feedback remains clear and the game does not feel confusing during repeated attempts
- [X] T030 [US4] Run a quick browser pass across major interface states to confirm that the menu, play area, win state, and history panel stay readable and consistent

**Checkpoint**: At this point, the game should feel polished and stable as a complete experience

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final cleanup, validation, and consistency checks across the whole app

- [X] T031 [P] Review `index.html`, `styles.css`, and `script.js` for cohesion, naming consistency, and any broken UI state transitions
- [X] T032 [P] Check all result history and persistence flows in `script.js` against the ranking rule and storage contract in `specs/001-number-guessing-game/contracts/README.md`
- [X] T033 [P] Run the quickstart validation steps from `specs/001-number-guessing-game/quickstart.md` and confirm each expected outcome is satisfied
- [X] T034 Final pass on the static site accessibility requirements in `styles.css` and `index.html`, including contrast, readable labels, and clear round status messaging
- [X] T035 Final cleanup of any stale state or duplicated logic in `script.js` before the feature is considered ready for review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (US1)**: Can start after Foundational (Phase 2) - independent MVP entry point
- **User Story 2 (US2)**: Can start after Foundational (Phase 2) - independent feedback loop
- **User Story 3 (US3)**: Can start after Foundational (Phase 2) - independent completion and ranking flow
- **User Story 4 (US4)**: Can start after the core gameplay stories are functional - refinement only

### Within Each User Story

- Core UI before logic
- Logic before persistence and ranking
- End-of-round flow before replay handling
- Validation after each implementation chunk

### Parallel Opportunities

- Setup tasks T002 and T003 can run in parallel
- Foundational tasks T006, T007, T008, and T009 can run in parallel once the state model is defined
- User Story 1 tasks T011 and T012 are parallelizable before T013 begins
- User Story 2 tasks T016 and T017 can run in parallel
- User Story 3 tasks T021 and T022 can run in parallel
- Final validation tasks T031 through T035 are parallelizable after implementation is complete

---

## Parallel Example: MVP Delivery

```bash
# Concurrent work for the first playable version:
Task: "Build the start menu UI in index.html"
Task: "Create the base visual theme system in styles.css"
Task: "Wire menu interactions in script.js"
Task: "Implement the start-game action in script.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Validate the menu and first round start
5. Stop and confirm the MVP is playable before continuing

### Incremental Delivery

1. Complete Setup + Foundational → foundation ready
2. Add User Story 1 → validate menu and game launch
3. Add User Story 2 → validate feedback and guessing loop
4. Add User Story 3 → validate win, persistence, and rankings
5. Add User Story 4 → polish readability and usability
6. Run final cross-cutting validation and feature review

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once the foundation is ready:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. After those are stable, a final pass focuses on polish and readability refinements

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Implementation should follow the shortest, simplest path aligned with the constitution
- The final implementation should remain a lightweight static web app and avoid unnecessary tooling or frameworks
