import React from 'react';

export class TermContainer extends React.Component {

    makeLetterContainer () {
        const termLetters = this.props.alt.split('');
        let indexesToShow = this.props.letterIndex;
        const container = termLetters.map(
            (letter,index) => {
                return (
                    <span className={indexesToShow.indexOf(index) > -1 ? 'showLetter' : 'hideLetter'}
                        key={index}>
                        {letter}
                    </span>
                )
            });
            return container
    }

    render () {
        return(
            <div className='gameContainer'
                letterstohide={this.props.lettersToHide}
                gamestate={this.props.gameStart.toString()}>
                
                    <img alt={this.props.alt} src={this.props.sources}/>
                    <div className='letterContainer'>
                        {
                            this.props.gameStart.toString() ? this.makeLetterContainer() : null
                        }
                    </div>
                    <p>Type in a letter!</p>
                    <div>
                        <i className="fa fa-star" aria-hidden="true"></i>
                    </div>
            </div>
        );
    }   
}


        
