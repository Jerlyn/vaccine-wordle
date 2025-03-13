import React from 'react';
import { checkGuess } from '../utils/gameLogic';

function Keyboard({ onKeyPress, guesses, dailyWord }) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
  ];
  
  // Create a map of letter evaluations based on all guesses
  const letterEvaluation = {};
  
  guesses.filter(Boolean).forEach(guess => {
    const evaluation = checkGuess(guess, dailyWord);
    
    guess.split('').forEach((letter, index) => {
      const currentEval = evaluation[index];
      const existingEval = letterEvaluation[letter];
      
      // Only update if the new evaluation is better than existing
      if (!existingEval || 
          (existingEval === 'absent' && currentEval !== 'absent') ||
          (existingEval === 'present' && currentEval === 'correct')) {
        letterEvaluation[letter] = currentEval;
      }
    });
  });
  
  return (
    <div className="keyboard" aria-label="Virtual keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => {
            let className = 'key';
            let ariaLabel = key;
            
            if (key !== 'ENTER' && key !== 'BACKSPACE') {
              className += ` ${letterEvaluation[key] || ''}`;
              if (letterEvaluation[key]) {
                ariaLabel += `, ${letterEvaluation[key]}`;
              }
            } else {
              className += ' function-key';
            }
            
            return (
              <button
                key={key}
                className={className}
                onClick={() => onKeyPress(key)}
                aria-label={ariaLabel}
              >
                {key === 'BACKSPACE' ? '←' : key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;