import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import { checkGuess, getDailyWord, getDailyHint } from './utils/gameLogic';

function App() {
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [dailyWord, setDailyWord] = useState('');
  const [dailyHint, setDailyHint] = useState('');
  const [message, setMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  
  // Initialize game
  useEffect(() => {
    setDailyWord(getDailyWord());
    setDailyHint(getDailyHint());
  }, []);

  // Handle keyboard input
  const handleKeyboard = (key) => {
    if (gameState !== 'playing') return;
    
    if (key === 'ENTER') {
      if (currentGuess.length !== 5) {
        setMessage('Word must be 5 letters');
        setTimeout(() => setMessage(''), 2000);
        return;
      }
      
      const currentGuessIndex = guesses.findIndex(guess => guess === null);
      if (currentGuessIndex === -1) return;
      
      const newGuesses = [...guesses];
      newGuesses[currentGuessIndex] = currentGuess;
      setGuesses(newGuesses);
      setCurrentGuess('');
      
      if (currentGuess === dailyWord) {
        setGameState('won');
        setMessage('Congratulations! You won!');
      } else if (currentGuessIndex === 5) {
        setGameState('lost');
        setMessage(`Game over! The word was ${dailyWord}`);
      }
    } else if (key === 'BACKSPACE') {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (currentGuess.length < 5 && /^[A-Z]$/.test(key)) {
      setCurrentGuess(currentGuess + key);
    }
  };

  // Add keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleKeyboard('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyboard('BACKSPACE');
      } else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) {
          handleKeyboard(key);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentGuess, gameState]);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <div className="App">
      <Header />
      <div className="game-container">
        <div className="hint-container">
          <button onClick={toggleHint} aria-expanded={showHint} aria-controls="game-hint">
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          {showHint && <p id="game-hint" className="hint">{dailyHint}</p>}
        </div>
        
        <div className="sr-only" role="status" aria-live="polite">
          {message}
        </div>
        
        {message && <div className="message">{message}</div>}
        
        <GameBoard 
          guesses={guesses} 
          currentGuess={currentGuess} 
          dailyWord={dailyWord} 
        />
        
        <Keyboard 
          onKeyPress={handleKeyboard} 
          guesses={guesses} 
          dailyWord={dailyWord} 
        />
      </div>
    </div>
  );
}

export default App;