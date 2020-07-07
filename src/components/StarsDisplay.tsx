import React, { FunctionComponent } from 'react';
import utils from '../utils/utils';

type StarsDisplayProps = {
  numStars: number;
};

const StarsDisplay: FunctionComponent<StarsDisplayProps> = (
  props: StarsDisplayProps,
) => {
  return (
    <>
      {utils.range(1, props.numStars + 1).map((index) => (
        <div key={index} className="star"></div>
      ))}
    </>
  );
};

export default StarsDisplay;
