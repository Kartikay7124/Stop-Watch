let stopwatchInterval;
let isRunning = false;
let elapsedTime = 0;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        stopwatchInterval = setInterval(updateTime, 1000);
        document.querySelector(".start-btn").textContent = "Pause";
    } else {
        isRunning = false;
        clearInterval(stopwatchInterval);
        document.querySelector(".start-btn").textContent = "Resume";
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(stopwatchInterval);
        document.querySelector(".start-btn").textContent = "Start";
    }
}

function resetStopwatch() {
    stopStopwatch();
    elapsedTime = 0;
    laps = [];
    updateDisplay();
    clearLaps();
}

function recordLap() {
    if (isRunning) {
        laps.push(formatTime(elapsedTime));
        updateLaps();
    }
}

function updateTime() {
    elapsedTime++;
    updateDisplay();
}

function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600);
    const minutes = Math.floor((elapsedTime % 3600) / 60);
    const seconds = elapsedTime % 60;
    const hoursStr = padTime(hours);
    const minutesStr = padTime(minutes);
    const secondsStr = padTime(seconds);

    const display = document.querySelector(".display");
    display.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function padTime(time) {
    return time.toString().padStart(2, "0");
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(secs)}`;
}

function updateLaps() {
    const lapsList = document.querySelector(".laps");
    lapsList.innerHTML = "";
    laps.forEach((lap, index) => {
        const li = document.createElement("li");
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function clearLaps() {
    const lapsList = document.querySelector(".laps");
    lapsList.innerHTML = "";
}
