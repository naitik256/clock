// --- 1. Get references to the four reels ---
const minutesTensReel = document.getElementById('minutes-tens');
const minutesOnesReel = document.getElementById('minutes-ones');
const secondsTensReel = document.getElementById('seconds-tens');
const secondsOnesReel = document.getElementById('seconds-ones');

const numberHeight = 90; // Must match the height in CSS for .reel div

/**
 * Creates the number strips inside each reel.
 * reel: The DOM element for the reel.
 * maxNumber: The highest number to generate (e.g., 5 for tens, 9 for ones).
 */
function createReel(reel, maxNumber) {
    for (let i = 0; i <= maxNumber; i++) {
        const numDiv = document.createElement('div');
        numDiv.textContent = i;
        reel.appendChild(numDiv);
    }
}

/**
 * Sets the position of a reel to show the correct digit.
 * reel: The reel element to move.
 * digit: The digit to display (0-9).
 */
function setReelPosition(reel, digit) {
    const yOffset = -digit * numberHeight;
    reel.style.transform = `translateY(${yOffset}px)`;
}

/**
 * This function runs every second to update the clock.
 */
function updateClock() {
    const now = new Date();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Split time into individual digits
    const minutesTens = Math.floor(minutes / 10);
    const minutesOnes = minutes % 10;
    const secondsTens = Math.floor(seconds / 10);
    const secondsOnes = seconds % 10;

    // Update the position of each reel
    setReelPosition(minutesTensReel, minutesTens);
    setReelPosition(minutesOnesReel, minutesOnes);
    setReelPosition(secondsTensReel, secondsTens);
    setReelPosition(secondsOnesReel, secondsOnes);
}

// --- Initial Setup ---

// Create the number strips
createReel(minutesTensReel, 5); // 0-5 for tens of minutes
createReel(minutesOnesReel, 9); // 0-9 for ones of minutes
createReel(secondsTensReel, 5); // 0-5 for tens of seconds
createReel(secondsOnesReel, 9); // 0-9 for ones of seconds

// Set the initial time immediately, then update every second
updateClock();
setInterval(updateClock, 1000);
