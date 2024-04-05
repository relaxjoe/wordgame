const { User, Dictionary } = require('../models');

let wordId = 1;
// TO DO: Check if the word is in the user's completed list and return true or false

// TO DO: Fetch the next word on the list
const fetchNext = async () => {
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
};

// Turn the word into an array
let wordArray = fetchNext().split('');
// TO DO: Get the user's guess and split it like in the line above

// TO DO: Read the input and loop through each letter