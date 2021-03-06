import React from 'react';

export const Startscreen = (props) => {
    return (
        <div className={props.className}>
            <div className='startButton' onClick={props.startGame}>
                <span>Start</span>
            </div>
            <div className='instructions'>
                <p>Instructions :</p>
                    <p>
                        In this excercise you will have to type in 
                        the missing letters to complete the word from the picture.
                        If you miss a letter your score doesn't increase :(
                    </p>
            </div>
        </div>
    );
}