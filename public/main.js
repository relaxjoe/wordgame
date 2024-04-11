const btn = document.querySelector("#btn");
const guessField = document.querySelector("#guess-field");
const board = document.querySelector("#board");
const modal = document.getElementById("completeModal");
const modalButton = document.getElementById("next-word-btn");

let secretWord;
let wordArray;
let guessArray;
let guessCount = 0;

// Function to open the completed modal
function openCompletedModal() {
  modal.classList.remove('hidden');
}

// Function to close the completed modal
function closeCompletedModal() {
  modal.classList.add('hidden');
}

// Function to get a new word
const getNewWord = async () => {
  try {
    const response = await fetch("/api/dictionary/getNewWord");
    const data = await response.json();
    secretWord = data.word.word;
    wordArray = secretWord.split("");
  } catch (err) {
    console.log(err);
  }
};

// Function to mark the word as completed
const markWordCompleted = async (wordId) => {
  try {
    const response = await fetch(`/api/dictionary/completed/${wordId}`);
    // Do something with the response if needed
  } catch (err) {
    console.log("Error marking word as completed:", err);
  }
};

// Checks for yellow letters
function checkPresent(increment, cloneArray) {
  for (let i = 0; i < 4; i++) {
    if (cloneArray.includes(guessArray[i])) {
      board.children[i + increment].setAttribute(
        "style",
        "background-color: yellow;"
      );

      // Identifies the first instance of the present letter and disguises it so repeats won't both be yellow
      let presentLetter = cloneArray.indexOf(guessArray[i]);
      cloneArray.splice(presentLetter, 1, "#");

      // Checks for yellows again in case of doubles
      if (cloneArray.includes(guessArray[i])) {
        board.children[i + increment].setAttribute(
          "style",
          "background-color: yellow;"
        );
      }
    }
  }
}

function checkLetters(increment) {
  const cloneArray = [...wordArray];
  for (let i = 0; i < 4; i++) {
    // Defaults all tiles to gray
    board.children[i + increment].setAttribute(
      "style",
      "background-color: gray;"
    );

    // Turns the correct letter(s) green
    if (cloneArray[i] === guessArray[i]) {
      board.children[i + increment].setAttribute(
        "style",
        "background-color: green;"
      );
      // Disguises the correct letter so it's not tagged by checkPresent
      cloneArray[i] = "#";
    }
  }
  checkPresent(increment, cloneArray);
}

// Displays the letters on the row and calls the function to color them
const renderGuess = (guessArray, wordId) => {
  const increment = guessCount * 4;
  for (let i = 0; i < 4; i++) {
    board.children[i + increment].append(guessArray[i]);
  }
  checkLetters(increment);
  // Check if the guessed word matches the secret word
  if (guessArray.join("") === secretWord) {
    markWordCompleted(wordId); // Mark word as completed
    openCompletedModal(); // Open completed modal when word is completed
  }
};

btn.addEventListener("click", function () {
  // Split the input value into an array of characters
  guessArray = guessField.value.split("");

  // Check if exactly 4 characters have been entered
  if (guessArray.length !== 4) {
    alert("Please enter exactly 4 letters.");
    return; // Exit the function early if validation fails
  }

  // Continue with the game logic if validation passes
  console.log(wordArray);
  renderGuess(guessArray);
  guessCount++;
});

// Event listener for modal button to fetch new word and reset grid
modalButton.addEventListener('click', async function () {
  closeCompletedModal(); // Close completed modal
  await getNewWord(); // Fetch new word
  resetGrid(); // Reset grid
});

// Function to reset grid box text and color
const resetGrid = () => {
  const cells = document.querySelectorAll('.gridCell');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.backgroundColor = 'gray';
  });
};

getNewWord(); // Fetch initial word
