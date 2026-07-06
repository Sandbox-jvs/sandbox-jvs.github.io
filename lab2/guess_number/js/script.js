/* 
Jessica Sandoval
CST336 - Lab 2: Guess the Number 
07/05/2026
*/

// alert("Running external JS code!");

//Global variables
let myLuckyNumber = 7;
let randomNumber;
let attempts = 0;
let remaining = 7;
let wins = 0;
let losses = 0;

intializeGame();


function intializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("Random number:  " + randomNumber);
    attempts = 0;

    // Hiding the Reset button
    document.querySelector('#resetBtn').style.display = "none";

    //Showing the guess button
    document.querySelector("#guessBtn").style.display = "inline";

    //Adding focus to the text box
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // Adding focus to the text box
    playerGuess.value = ""; //Clearing the text box

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //Clearing the feedback

    //Clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    //Reset remaining count
    remaining = 7;

    //Event Listeners
    document.querySelector("#guessBtn").addEventListener("click", checkGuess);
    document.querySelector("#resetBtn").addEventListener("click", intializeGame);
}


function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess);

    if (guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }

    attempts++;
    remaining--;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";

    let winCount = document.querySelector("#wins");
    let lossCount = document.querySelector("#losses");

        
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You won!";
        feedback.style.color = "darkgreen";
        wins++;
       winCount.textContent = "Total wins: " + wins;

        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == 7) {
            feedback.textContent = "Sorry, you lost!  Answer: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            lossCount.textContent = "Total losses: " + losses;
            gameOver();
        } else if ( guess > randomNumber) {
            feedback.textContent = "Guess was high! " + remaining + " tries left!";
        } else {
            feedback.textContent = "Guess was low! " + remaining + " tries left!";
        }
    }

    function gameOver() {
        let guessBtn = document.querySelector("#guessBtn");
        let resetBtn = document.querySelector("#resetBtn");

        guessBtn.style.display = "none"; //Hides the guess button
        resetBtn.style.display = "inline"; //Diplays the reset button
    }


}