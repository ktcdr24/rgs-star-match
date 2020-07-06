import React, { FunctionComponent, useState } from 'react';

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

const StarMatch: FunctionComponent = () => {
  const [stars, setStars] = useState(utils.random(1, 10));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 10));
  const [candidateNums, setCandidateNums] = useState([]);

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
      Welcome to the StarMatch game!
      <div className="body" style={{ display: 'flex' }}>
        <div className="left" style={{ border: '3px solid black' }}>
          <StarsDisplay stars={stars} />
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
