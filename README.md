# Real-time Download Simulator

This project is a **simple web application** that **simulates the download time of a file** based on its size and connection speed. An **animated progress bar** shows the download progress realistically.

## Features

- Enter the **file size** to download (Bytes, KB, MB, GB).
- Enter the **download speed** (in Kbps or Mbps).
- Automatic calculation of the **estimated download time**.
- Display the **time in hours, minutes, and seconds**.
- Progress bar that **gradually increases to 100%**.
- Final message indicating that the download is **complete**.

## Project Structure

```
project-root/
│
├─ index.html # Main page
├─ assets/
│ ├─ css/
│ │ └─ style.css # Styles for the form and progress bar
│ └─ js/
│ └─ script.js # Calculation logic and animation
```

## Usage

1. Open `index.html` in a web browser.
2. Enter the file size and select the corresponding unit.
3. Enter the download speed and select the unit (Kbps or Mbps).
4. Click **Validate** to start the calculation and see the progress bar animate.
5. The estimated download time is displayed above the progress bar.

## Notes

- Entered values must be **positive**.
- The calculation automatically converts sizes and speeds into bits for precise computation.
- The progress bar is simulated in percentage to visualize the download in real time.

## Author

- **Gabo Yann / Dodou12**
