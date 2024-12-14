import { useState, useEffect } from 'react';
    import randomWords from 'random-words';

    const HangmanDrawing = ({ incorrectGuesses }) => {
      return (
        <svg height="250" width="200">
          {/* Gallows */}
          <line x1="20" y1="240" x2="180" y2="240" style={{ stroke: 'black', strokeWidth: 2 }} />
          <line x1="50" y1="240" x2="50" y2="20" style={{ stroke: 'black', strokeWidth: 2 }} />
          <line x1="50" y1="20" x2="150" y2="20" style={{ stroke: 'black', strokeWidth: 2 }} />
          <line x1="150" y1="20" x2="150" y2="50" style={{ stroke: 'black', strokeWidth: 2 }} />

          {/* Head */}
          {incorrectGuesses > 0 && <circle cx="150" cy="70" r="20" style={{ stroke: 'black', strokeWidth: 2, fill: 'none' }} />}

          {/* Body */}
          {incorrectGuesses > 1 && <line x1="150" y1="90" x2="150" y2="150" style={{ stroke: 'black', strokeWidth: 2 }} />}

          {/* Arms */}
          {incorrectGuesses > 2 && <line x1="150" y1="110" x2="120" y2="100" style={{ stroke: 'black', strokeWidth: 2 }} />}
          {incorrectGuesses > 3 && <line x1="150" y1="110" x2="180" y2="100" style={{ stroke: 'black', strokeWidth: 2 }} />}

          {/* Legs */}
          {incorrectGuesses > 4 && <line x1="150" y1="150" x2="120" y2="180" style={{ stroke: 'black', strokeWidth: 2 }} />}
          {incorrectGuesses > 5 && <line x1="150" y1="150" x2="180" y2="180" style={{ stroke: 'black', strokeWidth: 2 }} />}
        </svg>
      );
    };

    export default function Home() {
      const [word, setWord] = useState('');
      const [guessedLetters, setGuessedLetters] = useState([]);
      const [incorrectGuesses, setIncorrectGuesses] = useState(0);
      const [gameStatus, setGameStatus] = useState('playing');
      const maxIncorrectGuesses = 6;

      useEffect(() => {
        startNewGame();
      }, []);

      const fetchRandomWord = () => {
        return randomWords();
      };

      const startNewGame = () => {
        const randomWord = fetchRandomWord();
        setWord(randomWord);
        setGuessedLetters([]);
        setIncorrectGuesses(0);
        setGameStatus('playing');
      };

      const handleGuess = (letter) => {
        if (gameStatus !== 'playing' || guessedLetters.includes(letter)) {
          return;
        }

        setGuessedLetters([...guessedLetters, letter]);

        if (!word.includes(letter)) {
          setIncorrectGuesses(incorrectGuesses + 1);
        }
      };

      useEffect(() => {
        if (incorrectGuesses >= maxIncorrectGuesses) {
          setGameStatus('lost');
        }

        if (word && word.split('').every(letter => guessedLetters.includes(letter))) {
          setGameStatus('won');
        }
      }, [incorrectGuesses, guessedLetters, word]);

      const renderWord = () => {
        if (!word) return null;
        return (
          <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '20px' }}>
            {word.split('').map((letter, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  minWidth: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '5px',
                  backgroundColor: '#f9f9f9',
                  fontSize: '1.5em',
                }}
              >
                {guessedLetters.includes(letter) ? letter : <span style={{ fontSize: '2em', color: '#333' }}>•</span>}
              </div>
            ))}
          </div>
        );
      };


      const renderKeyboard = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(30px, 1fr))', gap: '5px', maxWidth: '400px', margin: '0 auto' }}>
            {alphabet.split('').map((letter) => (
              <button
                key={letter}
                onClick={() => handleGuess(letter)}
                disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
                style={{
                  backgroundColor: '#ddd',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px',
                  cursor: 'pointer',
                  fontSize: '1em',
                  fontWeight: 'bold',
                  color: '#333',
                  opacity: guessedLetters.includes(letter) ? 0.6 : 1,
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        );
      };

      return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '20px' }}>
          <h1>Hangman</h1>
          <HangmanDrawing incorrectGuesses={incorrectGuesses} />
          {renderWord()}
          <div style={{ margin: '20px 0' }}>
            {renderKeyboard()}
          </div>
          {gameStatus === 'won' && <p style={{ color: 'green', fontSize: '1.2em' }}>You Won! The word was: {word}</p>}
          {gameStatus === 'lost' && <p style={{ color: 'red', fontSize: '1.2em' }}>You Lost! The word was: {word}</p>}
          {(gameStatus === 'won' || gameStatus === 'lost') && (
            <button
              onClick={startNewGame}
              style={{
                background: 'linear-gradient(to right, #1e3c72, #2a5298)',
                color: 'white',
                padding: '15px 30px',
                border: 'none',
                borderRadius: '30px',
                fontSize: '1.2em',
                cursor: 'pointer',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>Play Again</span>
              <span
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                  borderRadius: '30px',
                  pointerEvents: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  left: '-2px',
                  right: '-2px',
                  bottom: '-2px',
                  background: 'linear-gradient(to right, #ff0000, #ffff00)',
                  borderRadius: '30px',
                  zIndex: 0,
                  filter: 'blur(10px)',
                  opacity: 0.7,
                }}
              />
            </button>
          )}
        </div>
      );
    }
