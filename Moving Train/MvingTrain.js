document.addEventListener("DOMContentLoaded", function(){
    const train = document.getElementById("train");
    let speed = 5; 
    let position = 0; 
    let interval; 
    let isStopped = false;

    if (!train) { 
        alert("Train not found");
        return;
    }

    // Event Listener for Stop Button
    var stopButton = document.getElementById("stopButton");
    if (stopButton) {
        stopButton.addEventListener("click", function() {
            var confirmation = confirm("Are you sure you want to stop?");
            if (confirmation) {
                stopTrain();
            }
            // If the user clicks cancel, do nothing, let the train continue moving
        });
    } else {
        console.error("Stop button element not found!");
    }

    // Event Listener for SpeedUp Button
    var speedUpButton = document.getElementById("speedUpButton");
    if (speedUpButton) {
        speedUpButton.addEventListener("click", speedUp);
    } else {
        console.error("SpeedUp button element not found!");
    }

    // Event Listener for SlowDown Button
    var slowDownButton = document.getElementById("slowDownButton");
    if (slowDownButton) {
        slowDownButton.addEventListener("click", slowDown);
    } else {
        console.error("SlowDown button element not found!");
    }
     
    var btn = document.querySelector(".toggle");
    var body = document.querySelector("body");
    btn.onclick = function() {
        body.classList.toggle("on");
    }
    // Event Listener for Resume Button
    var resumeButton = document.getElementById("resumeButton");
    if (resumeButton) {
        resumeButton.addEventListener("click", resumeTrain);
    } else {
        console.error("Resume button element not found!");
    }

    // Event Listener for Pause Button
    var pauseButton = document.getElementById("pauseButton");
    if (pauseButton) {
        pauseButton.addEventListener("click", pauseTrain);
    } else {
        console.error("Pause button element not found!");
    }
    
    // Event Listener for Drop Button
    var dropButton = document.getElementById("dropButton");
    if (dropButton) {
        dropButton.addEventListener("click", function() {
            stopTrainForSeconds(4000); // Stop the train for 4 seconds (4000 milliseconds)
            playPeopleSound(); // Play sound effect for people getting off the train
        });
    } else {
        console.error("Drop button element not found!");
    }

    // Function to stop the train for a specified duration (in milliseconds)
    function stopTrainForSeconds(duration) {
        stopTrain(); // Stop the train
        setTimeout(function() {
            resumeTrain(); // Resume the train after the specified duration
        }, duration);
    }

    // Play the sound for moving train 
    function movingSoundTrain() {
        let movingSound = document.getElementById("trainSound");
        movingSound.play();
    }

    // Play the sound effect for people getting off the train
    function playPeopleSound() {
        let peopleSound = document.getElementById("peopleSound");
        peopleSound.play();
    }

    // Function to speed up the train
    function speedUp() {
        speed += 1; // Increase the speed
    }

    // Function to slow down the train
    function slowDown() {
        speed -= 1; // Decrease the speed
    }

    // Function for stopping the train
    function stopTrain() {
        clearInterval(interval);
        isStopped = true;
        train.style.left = position; 
        exitGame(); // Exit the game
    }
        // Function to exit the game
    function exitGame() {
        // You can add additional code here to perform any necessary cleanup or actions before exiting the game
    }

    // Function for resuming the train
    function resumeTrain() {
        isStopped = false;
        interval = setInterval(moveTrain, 100); // Start moving the train again
        movingSoundTrain(); // Play train sound when moving
    }

    // Function to pause the train
    function pauseTrain() {
        clearInterval(interval);
        isStopped = true;
    }

    // Function to move the train
    function moveTrain() {
        if (!isStopped) {
            position += speed; // Update the position
            train.style.left = position + 'px'; // Apply the new position
            checkPosition(); // Check if the train has reached a certain position
        }
    }

    // Function to check train position
    function checkPosition() {
        if (position >= 1285) {
            alert("Crash!");
            clearInterval(interval); // Stop the train movement
        }
    }

    // Initial call to start the train
    resumeTrain();
});
