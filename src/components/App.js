import React from 'react';
import {Startscreen} from './Startscreen';
import {TermContainer} from './TermContainer';
import { NextTask } from './NextTask';
import {EndScreen} from './EndScreen';

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

let wrongLetters = 0;

export class App extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            gameStarted: false,
            taskCompleted: false,
            gameEnded: false,
            currentTerm: [],
            hiddenLetters:[],
            step: 0,
            score: 0
        }

        this.onClick = this.onClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.shuffleArray = this.shuffleArray.bind(this);
        this.handleNextButtonClick = this.handleNextButtonClick.bind(this);
        this.handleTerm = this.handleTerm.bind(this);
    }

    componentDidMount () {
        window.addEventListener('onkeydown', this.handleKeyDown);
        this.shuffleArray(terms);
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

    onClick () {
        const hasStarted = !this.state.gameStarted;
        window.onkeydown = this.handleKeyDown;
        this.setState({
            gameStarted: hasStarted
        })
        this.handleTerm();
        document.body.style.backgroundImage = `linear-gradient(45deg, #93a5cf 0%, #e4efe9 100%)`;
    }

    handleKeyDown (e) {

        let hiddenLetters = this.state.hiddenLetters;
        let hiddenLetterIndex = this.state.indexesToHide;
        let pressedKey = String.fromCharCode(e.which).toLowerCase();
        console.log(pressedKey);

        if (hiddenLetters.indexOf(pressedKey) > -1) {
            hiddenLetterIndex.splice(hiddenLetters.indexOf(pressedKey), 1);
            hiddenLetters.splice(hiddenLetters.indexOf(pressedKey), 1);
            this.setState({
                indexesToHide: hiddenLetterIndex,
                hiddenLetters: hiddenLetters
            })
        } else {
            console.log('not a match')
            wrongLetters++
        }

        if (hiddenLetters.length === 0) {
            this.setState({
                taskCompleted: true,
            })           
        }

        if (hiddenLetters.length === 0 && wrongLetters === 0) {
            this.setState({
                score: this.state.score + 1
            })
        }
    }

    handleTerm () {
        if (terms[this.state.step] === undefined) {
            this.setState ({
                gameEnded: true,
                gameStarted: false
            })
            return
        }

        let currTerm = terms[this.state.step].split('');
        let numOfIndexesToHide = currTerm.length - 1;
        let randomIndexes = [];
        let slicedLetters = [];

        while(randomIndexes.length < numOfIndexesToHide) {
            let randomNum = Math.floor(Math.random()*currTerm.length)
            if (randomIndexes.indexOf(randomNum) === -1) {
                randomIndexes.push(randomNum);
                slicedLetters.push(currTerm.slice(randomNum, randomNum+1).join())
            }
        }
        
        this.setState({
            currentTerm: terms[this.state.step],
            hiddenLetters: slicedLetters,
            indexesToHide: randomIndexes, 
        })
    }

    handleNextButtonClick () {
        this.setState({
            taskCompleted:false,
            step: this.state.step + 1,
        }, () => this.handleTerm())
        wrongLetters = 0;
    }

    handleEnd = () => {
        this.setState({
            gameStarted: true,
            gameEnded: false,
            step: 0,
            score: 0
        }, () => {
            this.shuffleArray(terms);
            this.handleTerm();
        })
        
    }

    render () {
        return (
            <div className='appContainer'>
               {
                    !this.state.gameStarted && !this.state.gameEnded ?
                        <Startscreen
                            startGame={this.onClick}
                            className='startApp' /> : null
                }
                {
                    this.state.gameStarted && !this.state.gameEnded ? 
                        <TermContainer
                            letterIndex={this.state.indexesToHide}
                            gameStart={this.state.gameStarted}
                            sources={`./images/${terms[this.state.step]}.jpg`}
                            alt={terms[this.state.step]}
                            score={this.state.score} /> : null
                }
                {
                    this.state.taskCompleted && !this.state.gameEnded ? 
                        <NextTask 
                            className='nextTaskDisplay'
                            handleNext= {this.handleNextButtonClick}
                            score={this.state.score} /> : null
                }
                {
                    this.state.gameEnded ?
                        <EndScreen
                            className='endScreen'
                            handleEnd={this.handleEnd}
                            score={this.state.score}
                            termsLength={terms.length} /> : null
                }
                <footer>
                    Coded with <span id="heart"> ❤ </span> 
                    By: <a id="author" href="https://github.com/Max1mmus">Max1mmus</a>
                </footer>
            </div>
        )
    }
}