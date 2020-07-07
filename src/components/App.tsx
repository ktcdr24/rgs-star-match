import React, { FunctionComponent, useState } from 'react';
import StarMatch from './StarMatch';

export function App(): FunctionComponent {
  const [gameId, setGameId] = useState(1);
  const startNewGame = () => {
    console.log('Resetting game...');
    setGameId(gameId + 1);
  };

  return (
    <StarMatch
      key={gameId}
      startNewGame={startNewGame}
      starCount={9}
      gameDurationSeconds={10}
    />
  );
}
