# New Year 2027 Countdown

A responsive, timezone-aware countdown website built with HTML, CSS, and JavaScript. The project counts down to the beginning of the Ber Months and then automatically transitions into a festive Christmas-themed experience before continuing toward New Year 2027.

## Description

This project is designed around two major countdown events:

1. Ber Months — September 1, 2026 at 12:00 AM
2. New Year 2027 — January 1, 2027 at 12:00 AM

Before September arrives, the website uses its original red-and-black animated interface. A secondary countdown at the top displays the remaining time until the Ber Months begin.

When the Ber Months countdown reaches zero, the website performs an automatic visual transition. The Ber Months timer disappears, the interface repositions itself, and the website changes into a Christmas-inspired design.

The main New Year countdown continues running throughout the entire experience.

## How It Works

### 1. Ber Months Countdown

The JavaScript creates a local-time target for:

September 1, 2026
12:00:00 AM

The countdown calculates the difference between that target and the visitor's current device time.

It displays:

- Days
- Hours
- Minutes
- Seconds

The countdown is calculated directly in the browser, so no server is required.

### 2. Local Timezone Support

The website uses the visitor's own device timezone.

For example, a visitor in the Philippines sees September 1 begin at midnight in Philippine local time, while a visitor elsewhere sees the countdown based on their own local midnight.

The website also detects the browser's timezone using:

`Intl.DateTimeFormat().resolvedOptions().timeZone`

The detected timezone is displayed underneath the countdown.

### 3. Christmas Transition

When the Ber Months countdown reaches zero, JavaScript triggers the transition.

The website:

- Removes the Ber Months countdown.
- Repositions the remaining UI.
- Enables the Christmas theme.
- Activates the Christmas decorations.
- Generates falling snow.
- Turns on animated Christmas lights.
- Displays a large festive popup.
- Attempts to trigger device vibration where supported.

The original red-and-black theme remains active until the Ber Months countdown actually ends.

### 4. Reminder System

The reminder below the main countdown changes depending on the current stage.

Before September 1, it displays a reminder about the upcoming Ber Months.

When September 1 arrives, the reminder changes to announce that the Ber Months have begun.

Two minutes after the transition, the reminder changes again to focus on the upcoming New Year.

This timing is handled by JavaScript using `setTimeout()`.

### 5. One-Time Transition

The project uses the browser's `localStorage` to remember whether the Ber Months transition has already happened.

A key is stored in the browser to prevent the Christmas transition from playing again every time the user refreshes or reopens the page.

The transition timestamp is also stored so the website can determine whether the two-minute reminder period has already passed.

### 6. Christmas Theme

The Christmas theme is controlled through a CSS class:

`document.body.classList.add("christmas-mode");`

Before the transition, the website uses the original dark red-and-black design.

After the transition, CSS changes the appearance to a brighter Christmas palette featuring:

- Red
- Green
- White
- Gold

The Christmas visual layer remains hidden until the Christmas mode is activated.

### 7. Snow Animation

The snow is generated dynamically with JavaScript.

Instead of placing dozens of snowflakes manually into the HTML, the script creates them when Christmas mode begins.

Each snowflake receives randomized:

- Horizontal position
- Size
- Animation duration
- Animation delay

CSS then animates them from the top of the screen toward the bottom.

### 8. Christmas Lights

The Christmas lights are created in the HTML and styled with CSS.

The bulbs continuously animate using CSS keyframes, producing a glowing effect.

Different bulbs use different Christmas colors to create a multicolored string-light appearance.

### 9. Christmas Music

The project uses the browser's Web Audio API to generate a simple festive melody.

JavaScript creates:

- Musical notes
- Bass tones
- Rhythmic beats
- Melody patterns

The music can be started using the "Enable Christmas Music" button.

The music is activated through user interaction because modern browsers generally restrict websites from automatically playing audio without user interaction.

### 10. New Year Countdown

The primary countdown targets:

January 1, 2027
12:00:00 AM

It continuously calculates the remaining:

- Days
- Hours
- Minutes
- Seconds

Once the countdown reaches zero, all four values become:

00

## Technologies Used

### HTML

Provides the structure of the website, including:

- Countdown containers
- Timer units
- Reminder text
- Christmas decorations
- Popup
- Music button

### CSS

Handles:

- Layout
- Colors
- Responsive design
- Animated backgrounds
- Countdown cards
- Christmas lights
- Snow animation
- Popup animation
- Theme transitions

### JavaScript

Handles:

- Date calculations
- Timezone detection
- Countdown updates
- Ber Months transition
- Reminder changes
- Snow generation
- Christmas popup
- Device vibration
- Music generation
- Persistent browser state

## Project Philosophy

The goal is to make a simple countdown feel more like an event rather than just a clock.

The website starts with a relatively dark countdown interface. As September 1 arrives, the interface transforms into a Christmas-themed experience, making the beginning of the Ber Months feel like a deliberate transition.

The countdown then continues toward the final event:

January 1, 2027 — 12:00:00 AM.

## License

This project is intended for personal and educational use. You are free to modify the HTML, CSS, and JavaScript to customize the design, animations, countdown dates, and functionality.