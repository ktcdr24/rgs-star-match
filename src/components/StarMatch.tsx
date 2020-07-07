import React, { FunctionComponent, useState, useEffect } from 'react';

import utils from '../utils/utils';
import StarsDisplay from './StarsDisplay';
import TimerDisplay from './TimerDisplay';
import PlayNumber from './PlayNumber';
import GameResult from './GameResult';

interface StarMatchProps {
  starCount: number;
  gameDurationSeconds: number;
  startNewGame: () => void;
}

const StarMatch: FunctionComponent = (props: StarMatchProps) => {
  const numStars = props.starCount;
  const [stars, setStars] = useState(utils.random(1, numStars + 1));
  const [availableNums, setAvailableNums] = useState(
    utils.range(1, numStars + 1),
  );
  const [candidateNums, setCandidateNums] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(props.gameDurationSeconds);

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

  const onNumberClick = (number: number, status: string) => {
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
            <GameResult
              gameStatus={gameIsWon ? 'won' : 'lost'}
              startNewGame={props.startNewGame}
            />
          ) : (
            <StarsDisplay numStars={stars} />
          )}
        </div>
        <div className="right" style={{ border: '3px solid black' }}>
          {utils.range(1, numStars + 1).map((number) => (
            <PlayNumber
              key={number}
              number={number}
              status={getNumberStats(number)}
              onClickHandler={onNumberClick}
            />
          ))}
        </div>
      </div>
      <TimerDisplay secondsLeft={secondsLeft} />
    </div>
  );
};

export default StarMatch;
