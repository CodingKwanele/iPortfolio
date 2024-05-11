function checkGuess() {
    var secret_value = Math.floor(Math.random() * 20) + 1;
    var guess = parseInt(document.getElementById("Provide_Input").value);
    var output = document.getElementById("Output_Value");

    if (isNaN(guess) || guess < 1 || guess > 20) {
        output.innerText = "Please guess a number between 1 and 20.";
    } else if (guess == secret_value) {
        output.innerText = "Correct Guess";
    } else if (guess < secret_value) {
        output.innerText = "Incorrect, too low";
    } else {
        output.innerText = "Incorrect, too high";
    }


    outputCard.style.display = "block";

}
