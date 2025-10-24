const downloadSpeedInput = document.getElementById("taille-debit"); // input for download speed
const fileSizeInput = document.getElementById("taille-fichier"); // input for file size
const unitSelect = document.querySelector("select.select-unit"); // file unit selection
const speedUnitSelect = document.querySelector("select.select-debit"); // speed unit selection
const progressBarDisplay = document.querySelector("#progress-bar"); // progress bar
const resultMessage = document.querySelector("#message"); // display result message
const submitButton = document.querySelector("button"); // submit button

// Initialize variables with input values
let fileValue = fileSizeInput.value;
let speedValue = downloadSpeedInput.value;
let selectedSpeedUnit = speedUnitSelect.value;
let selectedFileUnit = unitSelect.value;
let convertedFileSize = 0; // file size converted to bytes
let convertedSpeed = 0; // speed converted to bytes/sec
let downloadTime = 0; // calculated download time
let units = ["o", "ko", "Mo", "Go"]; // possible file units
let speeds = ["kb", "Mb"]; // possible speed units

// Convert file size to bytes
function convertFileSize() {
  if (unitSelect) {
    if (selectedFileUnit === units[0]) {
      convertedFileSize = fileValue * 8; // bytes → bits
    }
    if (selectedFileUnit === units[1]) {
      convertedFileSize = fileValue * 1024; // KB → bytes
    }
    if (selectedFileUnit === units[2]) {
      convertedFileSize = fileValue * 1024 * 1024; // MB → bytes
    }
    if (selectedFileUnit === units[3]) {
      convertedFileSize = fileValue * 1024 * 1024 * 1024; // GB → bytes
    }
  }
}

// Convert download speed to bytes/sec
function convertSpeed() {
  if (speedUnitSelect) {
    if (selectedSpeedUnit === speeds[0]) {
      convertedSpeed = (speedValue * 1024) / 8; // kb/s → bytes/sec
    }
    if (selectedSpeedUnit === speeds[1]) {
      convertedSpeed = (speedValue * 1024 * 1024) / 8; // Mb/s → bytes/sec
    }
  }
}

function displayMessages() {} // empty function reserved for additional messages

// Calculate and display download time
function calculateDownloadTime() {
  downloadTime = convertedFileSize / convertedSpeed; // time in seconds
  let s, m, h;

  if (downloadTime >= 3600) {
    // if ≥ 1 hour
    h = Math.floor(downloadTime / 3600);
    m = Math.floor((downloadTime % 3600) / 60);
    s = Math.floor(downloadTime % 60);

    if (resultMessage) {
      resultMessage.textContent = `Download time: ${h}h:${m}m:${s}s`;
    }
  } else if (downloadTime >= 60) {
    // if ≥ 1 minute
    m = Math.floor(downloadTime / 60);
    s = Math.floor(downloadTime % 60);
    if (resultMessage) {
      resultMessage.textContent = `Download time: ${m}m:${s}s`;
    }
  } else {
    // less than a minute
    s = downloadTime;
    if (resultMessage) {
      setTimeout(() => {
        resultMessage.textContent = `Download time: ${s}s`;
      }, 500);
    }
  }
}

// Animate the progress bar in %
function progressBar() {
  progressBarDisplay.value = 0; // start at 0%
  const duration = downloadTime; // total download time in seconds
  const increment = 100 / duration; // % to add each second
  let percentage = 0;

  const intervalId = setInterval(() => {
    percentage += increment; // increment percentage
    if (percentage >= 100) {
      // end of simulation
      percentage = 100;
      clearInterval(intervalId);
      resultMessage.textContent = "✅Completed"; // final message
    }
    progressBarDisplay.value = percentage; // update bar
  }, 1000); // 1-second interval
}

// Click event on the submit button
submitButton.addEventListener("click", () => {
  fileValue = parseFloat(fileSizeInput.value); // convert input to number
  speedValue = parseFloat(downloadSpeedInput.value);
  selectedSpeedUnit = speedUnitSelect.value;
  selectedFileUnit = unitSelect.value;

  // check values
  if (fileValue <= 0 || speedValue <= 0) {
    resultMessage.textContent = "Values cannot be negative";
    return;
  }

  convertFileSize(); // convert file size
  convertSpeed(); // convert speed
  calculateDownloadTime(); // calculate time
  progressBar(); // start progress bar animation
});
