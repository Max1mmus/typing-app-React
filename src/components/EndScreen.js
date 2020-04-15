import React from 'react';

export const EndScreen = (props) => {
    return (
        <div className='endScreen'>
            <div className='endButton' onClick={props.handleEnd}>
                <span>Try again</span>
            </div>
            <p>Game over</p>
            <p className='score'>
                Your score : {`${props.score}/${props.termsLength}`}
            </p>
        </div>
    );
}