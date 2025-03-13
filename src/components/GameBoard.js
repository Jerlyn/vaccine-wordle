import React from 'react';
import { checkGuess } from '../utils/gameLogic';

function GameBoard({ guesses, currentGuess, dailyWord }) {
  // Create an array of 6 rows (max guesses)
  const rows = Array(6).fill(null);
  
  return (
    <div className="game-board" aria-label="Game board">
      {rows.map((_, rowIndex) => {
        // For rows with submitted guesses
        if (guesses[rowIndex]) {
          const evaluation = checkGuess(guesses[rowIndex], dailyWord);
          return (
            <div key={rowIndex} className="row" aria-label={`Row ${rowIndex + 1}`}>
              {guesses[rowIndex].split('').map((letter, letterIndex) => (
                <div 
                  key={letterIndex} 
                  className={`tile ${evaluation[letterIndex]}`}
                  aria-label={`${letter}, ${evaluation[letterIndex]}`}
                >
                  {letter}
                </div>
              ))}
            </div>
          );
        }
        
        // For the current row (in progress)
        if (guesses.findIndex(guess => guess === null) === rowIndex) {
          const currentGuessArray = currentGuess.split('');
          const emptyTiles = Array(5 - currentGuessArray.length).fill('');
          const displayedGuess = [...currentGuessArray, ...emptyTiles];
          
          return (
            <div key={rowIndex} className="row" aria-label={`Current row, row ${rowIndex + 1}`}>
              {displayedGuess.map((letter, letterIndex) => (
                <div 
                  key={letterIndex} 
                  className={`tile ${letter ? 'filled' : 'empty'}`}
                  aria-label={letter ? letter : "empty"}
                >
                  {letter}
                </div>
              ))}
            </div>
          );
        }
        
        // For empty rows
        return (
          <div key={rowIndex} className="row" aria-label={`Empty row, row ${rowIndex + 1}`}>
            {Array(5).fill('').map((_, letterIndex) => (
              <div 
                key={letterIndex} 
                className="tile empty"
                aria-label="empty"
              ></div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;