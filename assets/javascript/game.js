// make Array of Word Options (all lowercase)
var hangmanGame = {}

var wordsList = [
"seagull",
"pigeon",
"hawk",
"sparrow",
"eagle"
];


var numberOfGuesses;
var solution;
var solutionArray;
var numBlanks;
var blanksAndSuccesses;
var numOfWins = 0;
// startGame()
// Its how we we will start and restart the game.
// (Note: It's not being run here. It's just being made for future use.)
function startGame() {
  // Reset the guesses back to 0.
  // Solution is chosen randomly from wordList. (Like RPS)


  numberOfGuesses = 10;
  solution = wordsList[Math.floor(Math.random() * wordsList.length)];


  // The word is broken into individual letters. (convert string to array of letters)
  // We count the number of letters in the word. (tells us the number of `numBlanks`)
  solutionArray = solution.split("");
  numBlanks = solutionArray.length;


  // We print the solution in console (for testing).
  console.log("solution: " + solutionArray);

  // reset the guess and success array at each round. Array of letters (first array, for succesful guesses)
  blanksAndSuccesses = [];
  // reset the wrong guesses from the previous round. Array of letters (second arrays, one for fails)

  wrongGuessArray = [];

  for (var i = 0; i < numBlanks; i++) {
    // make a list of `_`
    // ex dog = ['d', 'o','g'] and generate a new array like ['_', '_', '_']
    blanksAndSuccesses.push("_");
  }

  // set #guesses-left to numberOfGuesses
  document.getElementById("guesses-left").innerHTML =  numberOfGuesses;
  // set #word-blanks to the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses;
  // set #wrong-guesses to empty / clears the wrong guesses from the previous round by
  document.getElementById("wrong-guesses").innerHTML = wrongGuessArray;
  //keeps score of wins
  document.getElementById("wins").innerHTML = numOfWins;


}

function checkLetters(letter) {

  var letterInWord = false;
  for (var i = 0; i < solutionArray.length; i++) { // for every element in solution array

      if (solutionArray[i] == letter) { //check if element at where ever im searching (index i), is equal to letter
        letterInWord = true;    //if found set letterInWord equal to true
        blanksAndSuccesses[i] = letter //set element in blanks array to letter found
      }
  }

  if (wrongGuessArray.includes(letter)) { //checks if letter is already in wrongGuess array, and if so it will return from function
    return 

  }

   if(!letterInWord) { //if letter was not found 
    wrongGuessArray.push(letter) // add letter to wrong guess array
    numberOfGuesses-- // and add to number of guess

  }
}

function roundComplete() {


  // set #guesses-left to numberOfGuesses
  document.getElementById("guesses-left").innerHTML =  numberOfGuesses;
  // set #word-blanks to the blanks at the beginning of each round in the HTML
  document.getElementById("word-blanks").innerHTML = blanksAndSuccesses;
  // set #wrong-guesses to empty / clears the wrong guesses from the previous round by
  document.getElementById("wrong-guesses").innerHTML = wrongGuessArray;
  // set #wrong-guesses to empty / clears the wrong guesses from the previous round by
  document.getElementById("wins").innerHTML = numOfWins;



    if(!blanksAndSuccesses.includes("_")) {
      numOfWins++;
      alert("Congrats! You're a high flyer! Kakaw!");
      startGame();
    }

    if(numberOfGuesses == 0) {
      alert("You lost!");
      startGame();
    }

}


// on initial page load Starts the Game by running the startGame() function
startGame();

// Then initiate the function for capturing key clicks.
document.onkeyup = function(event) {
  // Converts all key clicks to lowercase letters.
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  // Runs the code to check for correctness.
  checkLetters(letterGuessed);
  // Runs the code after each round is done.
  roundComplete();
};