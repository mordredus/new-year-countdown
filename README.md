# 🎄 New Year 2027 Countdown

A festive, timezone-aware countdown website for **New Year 2027**, featuring a special **Ber Months** countdown that transitions into a Christmas-themed interface on September 1, 2026.

## ✨ Features

- ⏳ **Ber Months Countdown**
  - Counts down to September 1, 2026 at 12:00:00 AM.
  - Displays days, hours, minutes, and seconds.
  - Uses the visitor's local device timezone.

- 🎆 **New Year 2027 Countdown**
  - Counts down to January 1, 2027 at 12:00:00 AM.
  - Displays days, hours, minutes, and seconds.

- 🎄 **Automatic Christmas Transition**
  - The original red-and-black theme remains active before September 1.
  - When the Ber Months countdown reaches zero:
    - Christmas colors appear.
    - Snow starts falling.
    - Christmas lights appear.
    - Decorations appear.
    - A festive popup appears.
    - Device vibration is triggered where supported.

- 🔔 **Dynamic Reminders**
  - The initial reminder announces the upcoming Ber Months.
  - After the Ber Months countdown finishes, the reminder changes.
  - Two minutes later, it changes to the New Year's countdown reminder.

- 🎵 **Christmas Music**
  - Includes browser-generated festive music using the Web Audio API.
  - No external audio file is required.
  - Music can be enabled manually using the music button.

- 💾 **Persistent State**
  - Uses `localStorage` so the Ber Months transition only occurs once per browser.
  - Refreshing the page will not replay the transition after it has already happened.

- 📱 **Responsive Design**
  - Designed for desktop and mobile devices.
  - Countdown boxes automatically resize for smaller screens.

## 📁 Project Structure

```text
new-year-countdown/
│
├── index.html
├── style.css
├── script.js
└── README.md```