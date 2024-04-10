const btn = document.querySelector('#btn');
const guessField = document.querySelector('#guess-field');
const board = document.querySelector('#board');

let secretWord;
let wordArray;
let guessArray;
let guessCount = 0;

//calls when user begins game
const getWord = async () => {
  try {
    const response = await fetch("/api/dictionary/getNewWord");
    const data = await response.json();
    secretWord = data.word.word;
    wordArray = secretWord.split('')
  } catch (err) {
    console.log(err);
  }
};



//call function when user completes all parts of section, and pass the word_id, play again should call 
const completeWord = async (wordId) => {
    try {
        const w = await fetch(`/api/dictionary/completed/${wordId}`);
        alert("word complete!!")
    } catch (err) {
        console.log("error")
    }
};

// Checks for yellow letters
function checkPresent(increment, cloneArray) {
    for(let i = 0; i < 4; i++) {
        if (cloneArray.includes(guessArray[i])) {
        board.children[i + increment].setAttribute('style', 'background-color: yellow;');

        // Identifies the first instance of the present letter and disguises it so repeats won't both be yellow
        let presentLetter = cloneArray.indexOf(guessArray[i]);
        cloneArray.splice(presentLetter, 1, '#');

            // Checks for yellows again in case of doubles
            if (cloneArray.includes(guessArray[i])) {
                board.children[i + increment].setAttribute('style', 'background-color: yellow;');
            }
        }
    };
}


function checkLetters(increment) {
    const cloneArray = [...wordArray];
    for(let i = 0; i < 4; i++) {

        // Defaults all tiles to gray
        board.children[i + increment].setAttribute('style', 'background-color: gray;');

        // Turns the correct letter(s) green
        if(cloneArray[i] === guessArray[i]) {
            board.children[i + increment].setAttribute('style', 'background-color: green;');
            // Disguises the correct letter so it's not tagged by checkPresent
            cloneArray[i] = '#';            
        }
    };
    checkPresent(increment, cloneArray);
};

// Displays the letters on the row and calls the function to color them
const renderGuess = (guessArray) => {
    const increment = guessCount * 4;
    for(let i = 0; i < 4; i++) {
        board.children[i + increment].append(guessArray[i]);
    }
    checkLetters(increment);
};

btn.addEventListener('click', function() {
    guessArray = guessField.value.split('');
    console.log(wordArray);
    renderGuess(guessArray);
    guessCount++;
});




getWord();


