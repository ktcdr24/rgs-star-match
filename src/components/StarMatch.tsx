import * as React from 'react';
import _ from 'lodash';

const StarMatch = () => {
    return (
        <div className='game'>
            Welcome to the StarMatch game!
            <div className='body'  style={{ display: 'flex'}}>
                <div className='left' style={{ border: '3px solid black'}}>
                    {_.range(1, 10).map(index => (
                        <div key={index} className='star'>
                        </div>
                    ))}
                </div>
                <div className='right' style={{ border: '3px solid black'}}>
                    Numbers
                </div>
            </div>
        </div>
    );
};

export default StarMatch;