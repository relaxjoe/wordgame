const btn = document.querySelector('#btn');
const guessField = document.querySelector('#guess-field');
const board = document.querySelector('#board');

let secretWord;
let wordArray;
let guessArray;
let wordId;
let guessCount = 0;

//calls when user begins game
const getWord = async () => {
  try {
    const response = await fetch("/api/dictionary/getNewWord");
    const data = await response.json();
    secretWord = data.word.word;
    wordId = data.word.id;
    wordArray = secretWord.split('')
  } catch (err) {
    console.log(err);
  }
};



//call function when user completes all parts of section, and pass the word_id, play again should call 
const completeWord = async () => {
    try {
        const w = await fetch(`/api/dictionary/completed/${wordId}`, {
            method: 'PUT'
        });
        alert("Word Complete!!")
        location.reload();
    } catch (err) {
        console.log("error")
    }
};

function checkSolved() {
    const guessString = JSON.stringify(guessArray);
    const wordString = JSON.stringify(wordArray);
    if(guessString === wordString) {
        completeWord();
        console.log('Solved!');
    }
}

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
    }
}


function checkLetters(increment) {
    checkSolved();
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
    // Split the input value into an array of characters
    guessArray = guessField.value.split('');

    
    // Check if exactly 4 characters have been entered
    if (guessArray.length !== 4) {
        alert('Please enter exactly 4 letters.');
        return; // Exit the function early if validation fails
    }
    
    // Continue with the game logic if validation passes
    console.log(wordArray);
    renderGuess(guessArray);
    guessCount++;

});


// Function to open the modal
function openModal() {
    document.getElementById('modal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

getWord();




