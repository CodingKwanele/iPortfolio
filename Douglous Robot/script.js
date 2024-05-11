document.addEventListener("DOMContentLoaded", function() {
    // Get references to DOM elements
    const rightEye = document.getElementById("righteye");
    const leftEye = document.getElementById("lefteye");
    const leftArm = document.getElementById("leftarm");

    // Array of eye colors
    const eyeColors = ['blue', 'white', 'red'];
    // Index to track the current eye color
    let currentColorIndex = 0;

// Function to toggle the eye color
function toggleEyeColor() {
    // Generate a random index to select a color from the array
    var randomIndex = Math.floor(Math.random() * eyeColors.length);
    // Get the color from the array using the random index
    var color = eyeColors[randomIndex];
    // Change the background color based on the eye color
    document.body.style.backgroundColor = (color === 'white') ? 'green' : (color === 'red') ? 'black' : ''; // Change background color to green if eyes are white, black if eyes are red
    // Change the background color of both eyes
    rightEye.style.backgroundColor = color;
    leftEye.style.backgroundColor = color;
    // Apply the glow effect based on the color
    rightEye.className = 'eye'; // Reset any previous glow classes
    leftEye.className = 'eye'; // Reset any previous glow classes
    if (color === 'red') {
        rightEye.classList.add('red-glow');
        leftEye.classList.add('red-glow');
        // Play the sound when the eyes become red
        var redSound = document.getElementById("redSound");
        redSound.play();
        // Reset the text content to "I <3 JS!"
        document.getElementById("douglas").innerHTML = 'I <3 JS!';
    } else if (color === 'white') {
        rightEye.classList.add('white-glow');
        leftEye.classList.add('white-glow');
        var redSound = document.getElementById("codesound");
        redSound.play();
        // Change the text content to "continue coding"
        document.getElementById("douglas").innerHTML = 'continue coding';
    }
}







    // Function to move the eyes up and down
    function moveUpDown(robotPart) {
        // Ensure the animation can be played again by removing any previous 'bounce' class
        robotPart.classList.remove('bounce');
        // Force a reflow in between removing and adding the class
        void robotPart.offsetWidth;
        // Add the 'bounce' class to start the animation
        robotPart.classList.add('bounce');
    }

    // Function to move the left arm right and left
    function moveRightLeft(e) {
        // Get the clicked robot part
        var robotPart = e.target;
        // Initialize left position
        var left = 0;
        // Set interval to move the left arm
        var id = setInterval(frame, 10);
        function frame() {
            // Update the left position
            robotPart.style.left = left + '%';
            left++;
            // Stop the animation when the arm reaches 70% left position
            if (left === 70) {
                clearInterval(id);
            }
        }
    }

    // Event listener for clicking on the eyes
    rightEye.addEventListener("click", function(e) {
        moveUpDown(e.target);
    });
    leftEye.addEventListener("click", function(e) {
        moveUpDown(e.target);
    });

    // Event listener for animation end on eyes
    rightEye.addEventListener('animationend', toggleEyeColor, { once: true });
    leftEye.addEventListener('animationend', toggleEyeColor, { once: true });

    // Event listener for clicking on the left arm
    leftArm.addEventListener("click", moveRightLeft);
});
