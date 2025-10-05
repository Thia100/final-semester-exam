// Gets ids to append timer counts from dom
const appendHours = document.querySelector("#hours");
const appendMinutes = document.querySelector("#minutes");
const appendSeconds = document.querySelector("#seconds");
const appendMiliseconds = document.querySelector("#milliseconds");

// Gets ids to start, stop and reset timer from dom
const startBtn = document.querySelector("#startBtn");
const stopBtn = document.querySelector("#stopBtn");
const resetBtn = document.querySelector("#resetBtn");

// variables for managing stopwatch states
let timer = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

// Format numbers to always have leading zeros (07)
function format(num, digits = 2) {
  return num.toString().padStart(digits, "0");
}

// updates stopwatch display
function update() {
  // calculate time passed
  elapsedTime = Date.now() - startTime;

  let ms = Math.floor((elapsedTime % 1000) / 100);
  let sec = Math.floor((elapsedTime / 1000) % 60);
  let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let hr = Math.floor(elapsedTime / (1000 * 60 * 60));

  // Update DOM elements
  appendMiliseconds.textContent = format(ms);
  appendSeconds.textContent = format(sec);
  appendMinutes.textContent = format(min);
  appendHours.textContent = format(hr);
}

startBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(update, 100);
    isRunning = true;

    // update button states
    // once start buton is clicked, it becomes greyed out and it can't be
    // clicked again therefore preventing multiple start
    // clicks when stopwatch is
    // already running
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});

stopBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime = Date.now() - startTime;
    isRunning = false;

    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;

  appendHours.textContent = "00";
  appendMinutes.textContent = "00";
  appendSeconds.textContent = "00";
  appendMiliseconds.textContent = "00";
});

// Gets the current year and last modified date and time
const currentYear = new Date().getFullYear();
const lastModified = document.lastModified;

// Sets the current year and copyright symbol as well as last modified date and time
document.querySelector("#currentYear").textContent = `© ${currentYear}`;
document.querySelector("#lastModified").textContent = ` Last Modified: ${lastModified}`;
