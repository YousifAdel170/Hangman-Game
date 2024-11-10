// letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// const letters = "abcdefghijklmnopqrstuvwxyz0123456789+.";

// Get array from the letters word
const arrayLetters = Array.from(letters);

// get the container of letters from HTML
const lettersContainer = document.querySelector(".letters");

// Create Letters to display it to the user & clickable  to choose the desired letter
arrayLetters.forEach((letter) => {
  // 1. Create Span for each letter
  const span = document.createElement("span");

  // 2. create text node for each span that created for each letter
  const letterTextNode = document.createTextNode(letter);

  // 3. append the letter text node to the span
  span.appendChild(letterTextNode);

  // 4. add class to the span (to style it)
  span.className = "letter-box";

  // 5. append the span to the letters Container
  lettersContainer.appendChild(span);
});

// Objects of words and categories
const words = {
  programming: [
    "JavaScript",
    "Python",
    "Java",
    "C",
    "Ruby",
    "Swift",
    "PHP",
    "TypeScript",
    "Kotlin",
    "Go",
    "Rust",
    "Perl",
    "R",
    "Scala",
    "Objective-C",
    "Dart",
    "Haskell",
    "Lua",
    "MATLAB",
    "SQL",
    "Julia",
    "Elixir",
    "Erlang",
    "VB.NET",
    "Groovy",
    "Fortran",
  ],
  movies: ["Inception", "The Matrix", "Interstellar", "Fight Club"],
  countries: [
    "US",
    "Canada",
    "Brazil",
    "UK",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Australia",
    "Japan",
    "China",
    "India",
    "Russia",
    "Mexico",
    "Argentina",
    "Egypt",
    "Palestine",
    "Turkey",
    "Indonesia",
    "Nigeria",
    "Sweden",
    "Norway",
  ],
  people: [
    "Newton",
    "Steve Jobs",
    "Elon Musk",
    "Bill Gates",
    "Beethoven",
    "Picasso",
    "Muhammad Ali",
  ],
};

// Get all Properties and store it
const allProperties = Object.keys(words);

// Get a random index of property
let randomPropertyIndex = Math.floor(Math.random() * allProperties.length);

// get the property name by the index
let randomPropertyName = allProperties[randomPropertyIndex];

// get the values inside the random property
let randomValues = words[randomPropertyName];

// get random Index of the values of the random property
let randomValueIndex = Math.floor(Math.random() * randomValues.length);

// get random value of the values of the random property
let randomValueName = randomValues[randomValueIndex];

// Set the span Value [word from: ...] to the propery name
document.querySelector(".game-info .category span").innerHTML =
  randomPropertyName;

// Select letters guess element
let letterGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word into an array
let arrayChosenWord = Array.from(randomValueName.toLowerCase());
// console.log(arrayChosenWord);

// Create Span for each character in the word [so we need to loop on the word]
arrayChosenWord.forEach((letter) => {
  // Create an empty span to display the character on it
  let span = document.createElement("span");

  // check if the word letter in the word is space ' ' then add class
  if (letter === " ") span.className = "space";

  //   Append the span into the letters guess container
  letterGuessContainer.appendChild(span);
});

// get all spans of the guess letters [array of the spans]
let guessSpans = document.querySelectorAll(".letters-guess span");

// Declare the wrong attempts variable
let wrongAttempts = 0;

// Get the hangman draw & save it into a variable
let draw = document.querySelector(".hangman-draw");

// handling if the user click on letter
document.addEventListener("click", (e) => {
  // declare guess status by default false
  let guessStatus = false;

  // Check if the clicked in the page is letter
  if (e.target.className === "letter-box") {
    // Add class clicked
    e.target.classList.add("clicked");

    // Save the clicked letter into variable
    let clickedLetter = e.target.innerHTML.toLowerCase();
    console.log(clickedLetter);

    arrayChosenWord.forEach((letter, letterIndex) => {
      // check if the clicked letter same as current letter
      if (clickedLetter === letter) {
        // set guess status to true
        guessStatus = true;

        // Here we check if the letter is repeated in the guess word, write it in each repeated span
        guessSpans.forEach((span, spanIndex) => {
          if (letterIndex === spanIndex) {
            span.innerHTML = clickedLetter;
          }
        });
      }
    });
    // Outside Loop
    if (guessStatus !== true) {
      // increase wrong attempts
      wrongAttempts++;
      // add class to the hangman to display more
      draw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound
      document.getElementById("fail").play();

      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // Play success Sound
      document.getElementById("success").play();

      checkWin(); // Check if the player has won
    }
  }
});

// Function to check if the player has won
function checkWin() {
  let allLettersGuessed = true;

  // Loop to see if there any element still empty
  guessSpans.forEach((span) => {
    if (span.innerHTML === "") allLettersGuessed = false;
  });

  // If all letters have been guessed right, show winning message
  if (allLettersGuessed) {
    let div = document.createElement("div");

    div.classList.add("win");

    let divTextNode = document.createTextNode(
      "Congratulations! You've guessed the word!"
    );

    div.appendChild(divTextNode);
    document.body.appendChild(div);

    // Disable next clicks
    lettersContainer.classList.add("finished");
  }
}

function endGame() {
  // create a game over div
  let div = document.createElement("div");

  // create a text node for this div
  let divTextNode = document.createTextNode(
    `Game Over, The Word Is ${randomValueName}.`
  );

  // add popup class to style it with css
  div.classList.add("popup");

  // append the text node to the div
  div.appendChild(divTextNode);

  // append the div to the body
  document.body.appendChild(div);
}

// Add an event listener to the Restart button
document.getElementById("restartButton").addEventListener("click", restartGame);

// Function to restart the game
function restartGame() {
  /* Reset wrong attempts */
  wrongAttempts = 0;

  /* Remove the 'finished' class from the letters container */
  lettersContainer.classList.remove("finished");

  /* Remove any drawn parts of the hangman */
  draw.classList.remove(
    ...Array.from(draw.classList).filter((className) =>
      className.startsWith("wrong-")
    )
  );

  /* Clear previous word and category info */
  letterGuessContainer.innerHTML = "";
  /* Clear letter-box "clicked" classes */
  document
    .querySelectorAll(".letter-box")
    .forEach((el) => el.classList.remove("clicked"));

  // Initialize new word and update global variables
  initializeNewWord();

  // Remove Game Over or Win popups if they exist
  const popup = document.querySelector(".popup");
  if (popup) popup.remove();
  const win = document.querySelector(".win");
  if (win) win.remove();
}

// Function to initialize a new random word and update the global variables
function initializeNewWord() {
  // Get a random index of property
  let randomPropertyIndex = Math.floor(Math.random() * allProperties.length);
  let randomPropertyName = allProperties[randomPropertyIndex];
  let randomValues = words[randomPropertyName];
  let randomValueIndex = Math.floor(Math.random() * randomValues.length);
  randomValueName = randomValues[randomValueIndex];

  // Update category display
  document.querySelector(".game-info .category span").innerHTML =
    randomPropertyName;

  // Set up spans for the new word
  arrayChosenWord = Array.from(randomValueName.toLowerCase());
  arrayChosenWord.forEach((letter) => {
    let span = document.createElement("span");
    if (letter === " ") span.className = "space";
    letterGuessContainer.appendChild(span);
  });

  // Update guess spans globally
  guessSpans = document.querySelectorAll(".letters-guess span");
}
