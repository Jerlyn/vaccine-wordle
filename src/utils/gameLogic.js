// This should be at the top of gameLogic.js
import VACCINE_WORD_LIST from '../data/vaccineWords';

// The rest of your gameLogic.js file
// Do NOT declare VACCINE_WORD_LIST again in this file

// Get a daily word based on the date
export function getDailyWord() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const index = dayOfYear % VACCINE_WORD_LIST.length;
  return VACCINE_WORD_LIST[index].word.toUpperCase();
}

// Get the hint for the daily word
export function getDailyHint() {
  const today = new Date();
  const dayOfYear = getDayOfYear(today);
  const index = dayOfYear % VACCINE_WORD_LIST.length;
  return VACCINE_WORD_LIST[index].hint;
}

// Helper to get day of year
function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Check a guess against the solution
export function checkGuess(guess, solution) {
  if (guess.length !== 5) throw new Error('Guess must be 5 letters');
  
  const evaluation = Array(5).fill('absent');
  const solutionLetters = solution.split('');
  
  // First pass: find correct positions
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      evaluation[i] = 'correct';
      solutionLetters[i] = null; // Mark as used
    }
  }
  
  // Second pass: find present letters
  for (let i = 0; i < 5; i++) {
    if (evaluation[i] !== 'correct') {
      const index = solutionLetters.indexOf(guess[i]);
      if (index !== -1) {
        evaluation[i] = 'present';
        solutionLetters[index] = null; // Mark as used
      }
    }
  }
  
  return evaluation;
}

