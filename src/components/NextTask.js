import React from 'react';

export const NextTask = (props) => {
    return(
        <div className="nextTaskOuter">
            <div className='nextTaskContainer'>
                <h1>Excellent!</h1>
                <h2>You've got a 
                <i className="fa fa-star" aria-hidden="true"></i>
                 </h2>
                <button className='nextButton' onClick={props.handleNext}>
                    Next
                </button>
            </div> 
        </div>
    )
}