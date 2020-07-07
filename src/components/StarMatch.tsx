import React, { FunctionComponent, useState, useEffect } from 'react';

import utils from '../utils/utils';
import StarsDisplay from './StarsDisplay';

const PlayNumber: FunctionComponent = (props) => {
  return (
    <button
      key={props.number}
      className="number"
      style={{ backgroundColor: colors[props.status] }}
      onClick={() => props.onClickHandler(props.number, props.status)}
    >
      {props.number}
    </button>
  );
};

const TimerDisplay: FunctionComponent = (props) => {
  return <div>Timer Remaining: {props.value}</div>;
};

const GameResult: FunctionComponent = (props) => {
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

const StarMatch: FunctionComponent = (props) => {
  const [stars, setStars] = useState(utils.random(1, 10));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 10));
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(10);

  const gameIsWon = availableNums.length === 0;
  const gameIsDone = gameIsWon || secondsLeft === 0;

  useEffect(() => {
    if (secondsLeft > 0 && !gameIsDone) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);
      return () => {
        clearTimeout(timerId);
      };
    }
  });

  const onNumberClick = (number, status) => {
    console.log('Number clicked', number, status);

    const newCandidateNums =
      status === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter((n) => n !== number);

    if (utils.sum(newCandidateNums) === stars) {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n),
      );
      setAvailableNums(newAvailableNums);
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setCandidateNums([]);
    } else {
      setCandidateNums(newCandidateNums);
    }
  };

  const candidateNumsAreWrong = utils.sum(candidateNums) > stars;

  const getNumberStats = (number: number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }
    if (candidateNums.includes(number)) {
      return candidateNumsAreWrong ? 'wrong' : 'candidate';
    }
    return 'available';
  };

  return (
    <div className="game">
      <h1>Welcome to the StarMatch game</h1>
      Pick 1 or more numbers that sum to the number of stars.
      <div className="body" style={{ display: 'flex' }}>
        <div className="left" style={{ border: '3px solid black' }}>
          {gameIsDone ? (
            <GameResult gameStatus={gameIsWon ? 'won' : 'lost'} />
          ) : (
            <StarsDisplay stars={stars} />
          )}
        </div>
        <div className="right" style={{ border: '3px solid black' }}>
          {utils.range(1, 10).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={getNumberStats(number)}
              onClickHandler={onNumberClick}
            />
          ))}
        </div>
      </div>
      <TimerDisplay value={secondsLeft} />
    </div>
  );
};

const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default StarMatch;
