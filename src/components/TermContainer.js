import React from 'react';

export class TermContainer extends React.Component {

    makeLetterContainer () {
        const termLetters = this.props.alt.split('');
        let indexesToHide = this.props.letterIndex;
        const container = termLetters.map(
            (letter,index) => {
                return (
                    <span className={indexesToHide.indexOf(index) > -1 ? 'hideLetter' : 'showLetter'}
                        key={index}>
                        {letter}
                    </span>
                )
            });
        return container;
    }

    generateStars () {
        let steps = this.props.steps;
        let stars = [];
        for (let i=0; i < steps; i++) {
            stars.push(<i className="fa fa-star" aria-hidden="true"></i>) 
        }
        return stars;
    }

    render () {
        if (this.props.gameStart && this.props.alt !== undefined) {
        return(
            <div className='gameContainer'>
                <img alt={this.props.alt} src={this.props.sources}/>
                <div className='letterContainer'>
                   {
                       this.makeLetterContainer()
                    }
                </div>
                <p>Type in a letter!</p>
                <div>
                    {this.generateStars()}
                </div>
            </div>
        )} else {
            return null
        }
    }
}