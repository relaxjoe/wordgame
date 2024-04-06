const { User, Dictionary } = require('../models');
const fetch = require("node-fetch-retry");

let wordId = 1;
// TO DO: Check if the word is in the user's completed list and return true or false

const isWordCompleted = async (userId, word) => {
    try {
        // Find the user by their ID
        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Get the user's completed words list
        const completedWords = await user.getCompletedWords();

        // Check if the word is in the completed words list
        return completedWords.some(completedWord => completedWord.word === word);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to check if the word is completed.');
    }
};


// TO DO: Fetch the next word on the list
const fetchNext = async () => {
    try {
        const response = await fetch(`/api/dictionary/${wordId}`, {
            method: 'GET'
        });
        if(response.ok) {
            const newWord = await response.json();
            console.log(JSON.stringify(newWord.word));
            return JSON.stringify(newWord.word);
        } else {
        throw new Error('Failed to retrieve a new word.')
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to retrieve a new word.')
    }

};

// Checks the letters that haven't been colored by the previous functions
function checkRemaining() {
    for(i = 0; i < 4; i++) {
        if(wordArray[i].style.color === 'yellow' || wordArray[i].style.color === 'green') {
            // Turn gray
            return;
        }
        // Turn yellow
    }
};

// Checks if the letter is not in the array at all
function checkGray() {
    for(i = 0; i < 4; i++) {
        if(!wordArray[i].includes(guessArray[i])) {
            // turn guessArray[i] gray
        }
    }
    checkRemaining();
};

// Checks if the letter is correct + in correct position
function checkGreen() {
    for(i = 0; i < 4; i++) {
        if(wordArray[i] === guessArray[i]) {
            // turn guessArray[i] green
        }
    }
    checkGray();
};

// Turn the word into an array
let wordArray = fetchNext().split('');
// TO DO: Get the user's guess and split it like in the line above
const processGuess = async (userId, guess) => {
    try {
        const word = await fetchNext();
        const isCompleted = await isWordCompleted(userId, word);
        if (isCompleted) {
            console.log('The word is already completed by the user.');
            return;
        }
        // Continue with processing the guess...
        const wordArray = word.split('');
        const guessArray = guess.split('');
        checkGreen();
    } catch (error) {
        console.error(error);
        // Handle error
    }
};




// Example usage:
const userId = 1; // Assuming the user ID is 1
const userGuess = 'example'; // Get the user's guess
processGuess(userId, userGuess); // Process the user's guess