import React, { FunctionComponent } from 'react';

interface GameResultProps {
  gameStatus: string;
  startNewGame: () => void;
}

const GameResult: FunctionComponent = (props: GameResultProps) => {
  const gameIsWon = props.gameStatus === 'won';
  const fontColor = gameIsWon ? 'Green' : 'Red';
  if (gameIsWon) {
    return (
      <div className="game-done">
        <div className="message" style={{ color: fontColor }}>
          Congrats! You won the game.
        </div>
        <button onClick={props.startNewGame}>Play Again!</button>
      </div>
    );
  } else {
    return (
      <div className="game-done">
        <div className="message" style={{ color: fontColor }}>
          Game Over!
        </div>
        <button onClick={props.startNewGame}>Play Again!</button>
      </div>
    );
  }
};

export default GameResult;
