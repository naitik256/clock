// Get all the necessary elements from the HTML
const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

// State variables to manage the stopwatch
let timerInterval = null; // To hold the setInterval function
let elapsedTime = 0;      // Time in milliseconds
let startTime = 0;        // The timestamp when the watch was started
let isRunning = false;    // Boolean to check if the watch is running

// Function to start or stop the watch
function startStop() {
    if (isRunning) {
        // --- STOP THE WATCH ---
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        // --- START THE WATCH ---
        // To handle pausing, we set the start time relative to the already elapsed time
        startTime = Date.now() - elapsedTime;
        // Update the time every 10 milliseconds for a smooth animation
        timerInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Stop';
    }
    // Toggle the running state
    isRunning = !isRunning;
}

// Function to reset the watch
function reset() {
    // Stop the timer
    clearInterval(timerInterval);
    // Reset all state variables
    elapsedTime = 0;
    isRunning = false;
    // Update the UI to its initial state
    updateDisplay();
    updateHands();
    startStopBtn.textContent = 'Start';
}

// This function is called every 10ms to update the UI
function updateTime() {
    // Calculate the total elapsed time
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;

    // Update the visual components
    updateDisplay();
    updateHands();
}

// Function to update the digital time display
function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10); // Show two digits for ms

    timeDisplay.textContent = 
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0');
}

// Function to rotate the watch hands
function updateHands() {
    const totalSeconds = elapsedTime / 1000;
    const totalMinutes = totalSeconds / 60;

    // A full circle is 360 degrees
    const secondsDegrees = (totalSeconds / 60) * 360;
    // The sub-dial is 30 minutes, so one full rotation is 30 minutes
    const minutesDegrees = (totalMinutes / 30) * 360;

    // Apply the rotation
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `translateY(calc(-100% + 28%)) rotate(${minutesDegrees}deg)`;
}

// Attach the functions to the button click events
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

// Set the initial state on page load
updateDisplay();
updateHands();
