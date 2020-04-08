import React from 'react';

export const NextTask = (props) => {
    return(
        <div className={props.className}>
            <div className='nextTaskContainer'>
                <h1>Exellent!</h1>
                <h2>You've got another
                <i className="fa fa-star" aria-hidden="true"></i>
                 </h2>
                <button className='nextButton' onClick={props.handleNext}>
                    Next
                </button>
            </div> 
        </div>
    )
}