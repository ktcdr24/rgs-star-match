import React, { FunctionComponent } from 'react';

interface PlayNumberProps {
  number: number;
  status: string;
  onClickHandler: (number: number, status: string) => void;
}

const PlayNumber: FunctionComponent = (props: PlayNumberProps) => {
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

const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue',
};

export default PlayNumber;
