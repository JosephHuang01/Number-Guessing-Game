const STORAGE_KEY = 'numberGuessingGameResults';

const DIFFICULTY_SETTINGS = {
  easy: { label: 'Easy', maxGuesses: 12 },
  medium: { label: 'Medium', maxGuesses: 8 },
  hard: { label: 'Hard', maxGuesses: 6 }
};

const THEMES = {
  sunset: {
    accent: '#ffcb5c',
    accentStrong: '#ff9f43',
    primary: '#7b61ff',
    success: '#79f2a8',
    bgTop: '#f8d8a2',
    bgBottom: '#f6a9b4'
  },
  ocean: {
    accent: '#ffd166',
    accentStrong: '#ffb703',
    primary: '#27b6ff',
    success: '#66f2c7',
    bgTop: '#9ad8ff',
    bgBottom: '#4e8de2'
  },
  meadow: {
    accent: '#ffdd8a',
    accentStrong: '#f9b53f',
    primary: '#3bb273',
    success: '#d3ff7d',
    bgTop: '#aef2bf',
    bgBottom: '#57b98c'
  },
  neon: {
    accent: '#ff67d4',
    accentStrong: '#ffb86b',
    primary: '#62e7ff',
    success: '#79ffb5',
    bgTop: '#1a123a',
    bgBottom: '#510d8f'
  }
};

const state = {
  theme: 'sunset',
  difficulty: 'medium',
  results: readResults(),
  secretNumber: null,
  attempts: 0,
  maxGuesses: DIFFICULTY_SETTINGS.medium.maxGuesses,
  roundStartTime: 0,
  isPlaying: false,
  guessedNumbers: new Set()
};

const themeButtons = document.querySelectorAll('.theme-option');
const difficultyInputs = document.querySelectorAll('input[name="difficulty"]');
const startGameButton = document.getElementById('start-game');
const heroStartButton = document.getElementById('hero-start-button');
const heroCodeButton = document.getElementById('hero-code-button');
const themeToggleButton = document.getElementById('theme-toggle');
const playAgainButton = document.getElementById('play-again-button');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen');
const guessForm = document.getElementById('guess-form');
const guessInput = document.getElementById('guess-input');
const guessDisplay = document.getElementById('guess-display');
const feedbackBanner = document.getElementById('feedback-banner');
const attemptCount = document.getElementById('attempt-count');
const difficultyLabel = document.getElementById('difficulty-label');
const limitMessage = document.getElementById('limit-message');
const resultsList = document.getElementById('results-list');
const bestScoreLabel = document.getElementById('best-score-label');
const winSummary = document.getElementById('win-summary');

document.addEventListener('DOMContentLoaded', () => {
  bindThemeButtons();
  bindDifficultyInputs();
  bindEvents();
  updateTheme(state.theme);
  updateDifficulty(state.difficulty);
  setAppearanceMode('dark');
  renderHistory();
  showMenu();
});

function bindThemeButtons() {
  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      updateTheme(button.dataset.theme);
    });
  });
}

function bindDifficultyInputs() {
  difficultyInputs.forEach((input) => {
    input.addEventListener('change', () => {
      updateDifficulty(input.value);
    });
  });
}

function bindEvents() {
  startGameButton.addEventListener('click', startGame);
  heroStartButton.addEventListener('click', () => {
    startGame();
    document.getElementById('game-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  heroCodeButton.addEventListener('click', () => {
    document.getElementById('start-screen').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  themeToggleButton.addEventListener('click', () => {
    const nextMode = document.body.dataset.mode === 'light' ? 'dark' : 'light';
    setAppearanceMode(nextMode);
  });
  playAgainButton.addEventListener('click', startGame);
  guessForm.addEventListener('submit', handleGuessSubmit);
}

function setAppearanceMode(mode) {
  document.body.dataset.mode = mode;
  themeToggleButton.textContent = mode === 'dark' ? 'Light mode' : 'Dark mode';
}

function readResults() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Could not read saved results:', error);
    return [];
  }
}

function saveResults() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.results));
}

function updateTheme(themeName) {
  state.theme = themeName;
  const theme = THEMES[themeName] || THEMES.sunset;

  document.body.dataset.theme = themeName;
  document.documentElement.style.setProperty('--bg-top', theme.bgTop);
  document.documentElement.style.setProperty('--bg-bottom', theme.bgBottom);
  document.documentElement.style.setProperty('--accent', theme.accent);
  document.documentElement.style.setProperty('--accent-strong', theme.accentStrong);
  document.documentElement.style.setProperty('--primary', theme.primary);
  document.documentElement.style.setProperty('--success', theme.success);

  themeButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.theme === themeName);
  });
}

function updateDifficulty(level) {
  state.difficulty = level;
  const config = DIFFICULTY_SETTINGS[level] || DIFFICULTY_SETTINGS.medium;
  state.maxGuesses = config.maxGuesses;
  difficultyLabel.textContent = config.label;
  limitMessage.textContent = `You have ${config.maxGuesses} guesses.`;

  difficultyInputs.forEach((input) => {
    input.checked = input.value === level;
  });
}

function renderHistory() {
  const ranked = rankResults(state.results).slice(0, 5);

  if (!ranked.length) {
    resultsList.innerHTML = '<li class="empty-state">No wins yet. Start your first round!</li>';
    bestScoreLabel.textContent = '--';
    return;
  }

  const best = ranked[0];
  bestScoreLabel.textContent = `${best.attempts} tries`;

  resultsList.innerHTML = ranked
    .map((result, index) => {
      const timeLabel = formatDuration(result.elapsedMs);
      return `<li><strong>#${index + 1}</strong> • ${result.attempts} tries • ${timeLabel} • ${result.difficulty}</li>`;
    })
    .join('');
}

function rankResults(results) {
  return [...results].sort((left, right) => {
    if (left.attempts !== right.attempts) return left.attempts - right.attempts;
    return left.elapsedMs - right.elapsedMs;
  });
}

function showMenu() {
  startScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  state.isPlaying = false;
  state.secretNumber = null;
  guessInput.value = '';
}

function startGame() {
  state.secretNumber = getRandomNumber(1, 100);
  state.attempts = 0;
  state.roundStartTime = Date.now();
  state.isPlaying = true;
  state.guessedNumbers = new Set();

  startScreen.classList.add('hidden');
  winScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  attemptCount.textContent = '0';
  guessInput.value = '';
  guessDisplay.textContent = '?';
  feedbackBanner.textContent = 'Make your first guess!';
  guessInput.focus();
}

function handleGuessSubmit(event) {
  event.preventDefault();

  if (!state.isPlaying || state.secretNumber === null) {
    return;
  }

  const value = Number(guessInput.value);

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    feedbackBanner.textContent = 'Choose a number between 1 and 100.';
    return;
  }

  state.guessedNumbers.add(value);
  state.attempts += 1;
  attemptCount.textContent = String(state.attempts);
  guessDisplay.textContent = String(value);

  if (value === state.secretNumber) {
    finishRound();
    return;
  }

  if (state.attempts >= state.maxGuesses) {
    feedbackBanner.textContent = value < state.secretNumber ? 'Too Low' : 'Too High';
    endRoundWithLoss();
    return;
  }

  feedbackBanner.textContent = value < state.secretNumber ? 'Too Low' : 'Too High';
  guessInput.value = '';
  guessInput.focus();
}

function finishRound() {
  const elapsedMs = Date.now() - state.roundStartTime;
  const result = {
    id: `result-${Date.now()}`,
    attempts: state.attempts,
    elapsedMs,
    completedAt: new Date().toISOString(),
    difficulty: state.difficulty,
    theme: state.theme
  };

  state.results.push(result);
  state.results = rankResults(state.results);
  saveResults();
  renderHistory();

  state.isPlaying = false;
  gameScreen.classList.add('hidden');
  winScreen.classList.remove('hidden');

  feedbackBanner.textContent = 'Correct';
  triggerResultAnimation(true);
  guessDisplay.textContent = String(state.secretNumber);
  winSummary.textContent = `You guessed the hidden number in ${state.attempts} tries and finished in ${formatDuration(elapsedMs)}.`;
  guessInput.value = '';
}

function endRoundWithLoss() {
  state.isPlaying = false;
  gameScreen.classList.add('hidden');
  winScreen.classList.remove('hidden');
  guessDisplay.textContent = String(state.secretNumber);
  triggerResultAnimation(false);
  winSummary.textContent = `Out of guesses! The hidden number was ${state.secretNumber}. Try again in a new round.`;
  feedbackBanner.textContent = 'Too Low';
  guessInput.value = '';
}

function triggerResultAnimation(isWin) {
  const display = guessDisplay;
  display.classList.remove('result-flash-win', 'result-flash-loss');
  void display.offsetWidth;
  display.classList.add(isWin ? 'result-flash-win' : 'result-flash-loss');

  window.setTimeout(() => {
    display.classList.remove('result-flash-win', 'result-flash-loss');
  }, 700);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(1, Math.round(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}
