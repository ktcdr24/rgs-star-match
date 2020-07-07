import React, { FunctionComponent } from 'react';

interface TimerDisplayProps {
  secondsLeft: number;
}

const TimerDisplay: FunctionComponent = (props: TimerDisplayProps) => {
  return <div>Timer Remaining: {props.secondsLeft}</div>;
};

export default TimerDisplay;
