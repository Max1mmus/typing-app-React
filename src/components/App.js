import React from 'react';
import {Startscreen} from './Startscreen';
import {TermContainer} from './TermContainer';
import { NextTask } from './NextTask';
//img sources pexel.com
const terms = [
    'lion',
    'desert',
    'dandelion',
    'shuttle',
    'globe', 
    'snowflake',
    'earth',
    'deer',
    'rooster',
    'frog'
];

export class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            gameStarted: false,
            taskCompleted: false,
            currentTerm: [],
            hiddenLetters:[],
            step: 0,
        }

        this.onClick = this.onClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
    }

    componentDidMount () {
        window.addEventListener('onkeydown', this.handleKeyDown);
        this.shuffleArray(terms);
    }

    onClick () {
        const hasStarted = this.state.gameStarted ? false : true;
        window.onkeydown = this.handleKeyDown;
        
        let counter = 0;
        let numOfLettersToShow = 2;
        let termToBeModified = terms[this.state.step].split('');
        let randomIndexes = [];
        while (counter < numOfLettersToShow) {
            let randomNum = Math.floor(Math.random()*terms[this.state.step].length);
            
            termToBeModified.splice(randomNum,1);
            randomIndexes.push(randomNum)
            console.log(randomNum)
            counter++;
        }
        
        this.setState({
            gameStarted: hasStarted,
            currentTerm: terms[this.state.step],
            hiddenLetters: termToBeModified,
            shownLettersIndex: randomIndexes, 
        })
        
        
        document.body.style.backgroundImage = `linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)`;
    }

    handleKeyDown (e) {
        let guessedLetters = 0;
        let currTerm = this.state.currentTerm.split('');
        let hiddenLetterIndex = this.state.shownLettersIndex;
        let pressedKey = String.fromCharCode(e.which).toLowerCase();
    }

    shuffleArray (array) {
        let currentIndex = array.length;
        while (currentIndex > 0) {
            let randomIndex = Math.floor(Math.random()*currentIndex);
            currentIndex--;
            let tempVal = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = tempVal;
        }
        console.log(array)
        return array
    }

    render () {
        return (
            <div className='appContainer'>
                <Startscreen
                    startGame={this.onClick}
                    className={!this.state.gameStarted ? 'startApp' : 'hidden'} />
                {
                    this.state.gameStarted ? 
                        <TermContainer
                            letterIndex={this.state.shownLettersIndex}
                            gameStart={this.state.gameStarted}
                            sources={`./images/${terms[this.state.step]}.jpg`}
                            alt={terms[this.state.step]} />
                    : null
                }
                {
                    this.state.taskCompleted ? 
                        <NextTask 
                            isCompleted={this.state.taskCompleted}
                            className={!this.state.taskCompleted ? 'nextTaskDisplay' : 'none'} />
                    : null
                }
            </div>
        )
    }
}