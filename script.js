// --- 1. Element Selection ---
const dial = document.getElementById('dial');
const secondHand = document.getElementById('second-hand');
const minuteHand = document.getElementById('minute-hand');
const timeDisplay = document.getElementById('time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');

// --- 2. State Variables ---
let timerInterval = null;
let elapsedTime = 0;
let startTime = 0;
let isRunning = false;

// --- 3. Functions ---

/**
 * Creates the watch face (ticks and numbers) dynamically using JavaScript.
 * This runs once when the page loads.
 */
function createWatchFace() {
    // Create 60 tick marks
    for (let i = 0; i < 60; i++) {
        const tick = document.createElement('div');
        tick.classList.add('tick');
        if (i % 5 === 0) tick.classList.add('large'); // Make hour marks larger
        tick.style.transform = `rotate(${i * 6}deg)`; // 360 / 60 = 6 degrees per tick
        dial.appendChild(tick);
    }

    // Create 12 Roman numerals
    const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
    for (let i = 0; i < 12; i++) {
        const numberContainer = document.createElement('div');
        numberContainer.classList.add('number');
        const rotation = i * 30; // 360 / 12 = 30 degrees per number
        
        numberContainer.style.setProperty('--rotation', rotation);
        numberContainer.style.transform = `rotate(${rotation}deg)`;
        
        const numberSpan = document.createElement('span');
        numberSpan.textContent = romanNumerals[i];
        
        numberContainer.appendChild(numberSpan);
        dial.appendChild(numberContainer);
    }
}

/**
 * Starts or stops the stopwatch.
 */
function startStop() {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10ms for smooth animation
        startStopBtn.textContent = 'Stop';
    }
    isRunning = !isRunning;
}

/**
 * Resets the stopwatch to zero.
 */
function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    updateDisplay();
    updateHands();
    startStopBtn.textContent = 'Start';
}

/**
 * Updates the elapsed time. Called by setInterval.
 */
function updateTime() {
    elapsedTime = Date.now() - startTime;
    updateDisplay();
    updateHands();
}

/**
 * Updates the digital time display (00:00.00).
 */
function updateDisplay() {
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);

    timeDisplay.textContent = 
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + '.' +
        String(milliseconds).padStart(2, '0');
}

/**
 * Rotates the watch hands based on the elapsed time.
 */
function updateHands() {
    const totalSeconds = elapsedTime / 1000;
    const totalMinutes = totalSeconds / 60;

    const secondsDegrees = (totalSeconds / 60) * 360;
    const minutesDegrees = (totalMinutes / 30) * 360; // 30-minute sub-dial

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `translateY(calc(-100% + 28%)) rotate(${minutesDegrees}deg)`;
}

// --- 4. Event Listeners and Initial Setup ---
startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);

// Run these functions when the page loads to set everything up
createWatchFace();
updateDisplay();
updateHands();
