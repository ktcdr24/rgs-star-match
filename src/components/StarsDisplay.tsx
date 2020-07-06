import React, { FunctionComponent } from 'react';
import utils from '../utils/utils';

type StarsDisplayProps = {
  stars: number;
};

const StarsDisplay: FunctionComponent<StarsDisplayProps> = (
  props: StarsDisplayProps,
) => {
  return (
    <>
      {utils.range(1, props.stars + 1).map((index) => (
        <div key={index} className="star"></div>
      ))}
    </>
  );
};

export default StarsDisplay;
