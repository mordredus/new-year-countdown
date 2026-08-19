/* =====================================================
   CONFIGURATION
   ===================================================== */

/*
   PRODUCTION MODE

   Ber Months begins:

   September 1, 2026
   12:00:00 AM

   The date is interpreted in the visitor's
   LOCAL DEVICE TIMEZONE.

   Example:

   Philippines:
   September 1, 2026 12:00 AM PHT

   Japan:
   September 1, 2026 12:00 AM JST

   United States:
   September 1, 2026 12:00 AM
   in the visitor's local timezone.
*/

const USE_TEST_TIME = false;


/* =====================================================
   BER MONTHS TARGET
   ===================================================== */

let berTarget;


if (USE_TEST_TIME) {

    /*
       Testing only.
    */

    berTarget = new Date();

    berTarget.setHours(
        23,
        46,
        20,
        0
    );

} else {

    /*
       September 1, 2026
       12:00:00 AM

       JavaScript's Date constructor
       uses the user's local timezone
       when no timezone is specified.
    */

    berTarget = new Date(
        2026,
        8,
        1,
        0,
        0,
        0,
        0
    );
}


/* =====================================================
   NEW YEAR TARGET
   ===================================================== */

const newYearTarget =
    new Date(
        2027,
        0,
        1,
        0,
        0,
        0,
        0
    );


/* =====================================================
   STORAGE
   ===================================================== */

const transitionKey =
    "newYear2027_berComplete_v5";

const transitionTimeKey =
    "newYear2027_transitionTime_v5";


/* =====================================================
   ELEMENTS
   ===================================================== */

const berDays =
    document.getElementById("berDays");

const berHours =
    document.getElementById("berHours");

const berMinutes =
    document.getElementById("berMinutes");

const berSeconds =
    document.getElementById("berSeconds");


const days =
    document.getElementById("days");

const hours =
    document.getElementById("hours");

const minutes =
    document.getElementById("minutes");

const seconds =
    document.getElementById("seconds");


const reminder =
    document.getElementById("reminder");

const timezone =
    document.getElementById("timezone");

const overlay =
    document.getElementById("christmasOverlay");

const musicButton =
    document.getElementById("musicButton");


/* =====================================================
   TIMEZONE
   ===================================================== */

const detectedTimezone =
    Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;

timezone.textContent =
    "LOCAL TIMEZONE • " +
    detectedTimezone;


/* =====================================================
   STATE
   ===================================================== */

let christmasStarted =
    localStorage.getItem(
        transitionKey
    ) === "true";


let transitionTimestamp =
    Number(
        localStorage.getItem(
            transitionTimeKey
        )
    ) || 0;


/* =====================================================
   BER REMINDER
   ===================================================== */

function showBerReminder() {

    reminder.innerHTML = `

        <strong>
            THE BER MONTHS ARE HERE!
        </strong>

        <br>

        September 1, 2026 —
        12:00:00 AM

        <br>

        Christmas season has officially begun.

    `;
}


/* =====================================================
   NEW YEAR REMINDER
   ===================================================== */

function showNewYearReminder() {

    reminder.innerHTML = `

        <strong>
            NEW YEAR'S COUNTDOWN
        </strong>

        <br>

        January 1, 2027 —
        12:00:00 AM

        <br>

        The Ber Months have officially begun.
        The countdown to 2027 continues.

    `;
}


/* =====================================================
   RESTORE COMPLETED STATE
   ===================================================== */

function restoreCompletedState() {

    document.body.classList.add(
        "ber-complete"
    );

    document.body.classList.add(
        "christmas-mode"
    );

    createSnow();


    const elapsed =
        Date.now() -
        transitionTimestamp;


    const twoMinutes =
        120000;


    if (
        transitionTimestamp &&
        elapsed >= twoMinutes
    ) {

        showNewYearReminder();

    } else {

        showBerReminder();


        const remaining =
            Math.max(
                0,
                twoMinutes - elapsed
            );


        setTimeout(
            showNewYearReminder,
            remaining
        );
    }
}


if (christmasStarted) {

    restoreCompletedState();

}


/* =====================================================
   BER MONTHS COMPLETION
   ===================================================== */

function completeBerMonths() {

    if (christmasStarted) {
        return;
    }


    christmasStarted =
        true;


    transitionTimestamp =
        Date.now();


    localStorage.setItem(
        transitionKey,
        "true"
    );


    localStorage.setItem(
        transitionTimeKey,
        String(
            transitionTimestamp
        )
    );


    /*
       Remove Ber Months timer.
    */

    document.body.classList.add(
        "ber-complete"
    );


    /*
       Keep Ber Months reminder
       for two minutes.
    */

    showBerReminder();


    /*
       Activate Christmas theme.
    */

    document.body.classList.add(
        "christmas-mode"
    );


    createSnow();


    /*
       Christmas popup.
    */

    overlay.classList.add(
        "active"
    );


    /*
       Device vibration where supported.
    */

    if (
        navigator.vibrate
    ) {

        navigator.vibrate([
            200,
            100,
            200,
            100,
            400
        ]);

    }


    /*
       Close popup.
    */

    setTimeout(
        () => {

            overlay.classList.remove(
                "active"
            );

        },
        6000
    );


    /*
       Change reminder after
       two minutes.
    */

    setTimeout(
        () => {

            showNewYearReminder();

        },
        120000
    );
}


/* =====================================================
   BER COUNTDOWN
   ===================================================== */

function updateBerCountdown() {

    if (christmasStarted) {
        return;
    }


    const remaining =
        berTarget.getTime() -
        Date.now();


    if (remaining <= 0) {

        berDays.textContent =
            "00";

        berHours.textContent =
            "00";

        berMinutes.textContent =
            "00";

        berSeconds.textContent =
            "00";


        completeBerMonths();

        return;
    }


    const totalSeconds =
        Math.floor(
            remaining / 1000
        );


    const d =
        Math.floor(
            totalSeconds / 86400
        );


    const h =
        Math.floor(
            (totalSeconds % 86400) /
            3600
        );


    const m =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const s =
        totalSeconds % 60;


    berDays.textContent =
        String(d).padStart(2, "0");

    berHours.textContent =
        String(h).padStart(2, "0");

    berMinutes.textContent =
        String(m).padStart(2, "0");

    berSeconds.textContent =
        String(s).padStart(2, "0");
}


/* =====================================================
   NEW YEAR COUNTDOWN
   ===================================================== */

function updateNewYearCountdown() {

    const remaining =
        newYearTarget.getTime() -
        Date.now();


    if (remaining <= 0) {

        days.textContent =
            "00";

        hours.textContent =
            "00";

        minutes.textContent =
            "00";

        seconds.textContent =
            "00";

        return;
    }


    const totalSeconds =
        Math.floor(
            remaining / 1000
        );


    const d =
        Math.floor(
            totalSeconds / 86400
        );


    const h =
        Math.floor(
            (totalSeconds % 86400) /
            3600
        );


    const m =
        Math.floor(
            (totalSeconds % 3600) /
            60
        );


    const s =
        totalSeconds % 60;


    days.textContent =
        String(d).padStart(2, "0");

    hours.textContent =
        String(h).padStart(2, "0");

    minutes.textContent =
        String(m).padStart(2, "0");

    seconds.textContent =
        String(s).padStart(2, "0");
}


/* =====================================================
   SNOW
   ===================================================== */

function createSnow() {

    const container =
        document.getElementById(
            "snowContainer"
        );


    if (
        container.children.length > 0
    ) {
        return;
    }


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        const snow =
            document.createElement(
                "div"
            );


        snow.className =
            "snowflake";


        snow.textContent =
            Math.random() > .35
                ? "❄"
                : "✦";


        snow.style.left =
            Math.random() *
            100 +
            "%";


        snow.style.fontSize =
            (
                8 +
                Math.random() * 18
            ) +
            "px";


        snow.style.animationDuration =
            (
                5 +
                Math.random() * 9
            ) +
            "s";


        snow.style.animationDelay =
            (
                Math.random() * 8
            ) +
            "s";


        container.appendChild(
            snow
        );
    }
}


/* =====================================================
   CHRISTMAS MUSIC
   ===================================================== */

let audioContext =
    null;

let musicPlaying =
    false;

let musicTimer =
    null;

let musicStep =
    0;


/* =====================================================
   AUDIO CONTEXT
   ===================================================== */

function getAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}


/* =====================================================
   NOTES
   ===================================================== */

const NOTE = {

    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,

    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
    F5: 698.46,
    G5: 783.99,
    A5: 880.00,
    B5: 987.77,

    C6: 1046.50,
    D6: 1174.66,
    E6: 1318.51
};


/* =====================================================
   MELODY
   ===================================================== */

const melody = [

    ["E5", .30],
    ["E5", .30],
    ["E5", .45],
    [null, .15],

    ["E5", .30],
    ["E5", .30],
    ["E5", .45],
    [null, .15],

    ["E5", .30],
    ["G5", .30],
    ["C5", .30],
    ["D5", .30],
    ["E5", .60],

    ["F5", .30],
    ["F5", .30],
    ["F5", .30],
    ["F5", .30],

    ["F5", .30],
    ["E5", .30],
    ["E5", .30],
    ["E5", .30],

    ["E5", .30],
    ["D5", .30],
    ["D5", .30],
    ["E5", .30],
    ["D5", .30],
    ["G5", .60]

];


/* =====================================================
   BASS
   ===================================================== */

const bass = [

    "C4",
    "C4",
    "G4",
    "G4",

    "C4",
    "C4",
    "F4",
    "F4",

    "G4",
    "G4",
    "C4",
    "C4"

];


/* =====================================================
   PLAY TONE
   ===================================================== */

function playTone(
    frequency,
    startTime,
    duration,
    volume,
    type = "sine"
) {

    const ctx =
        getAudioContext();


    const oscillator =
        ctx.createOscillator();

    const gain =
        ctx.createGain();


    oscillator.type =
        type;


    oscillator.frequency.setValueAtTime(
        frequency,
        startTime
    );


    oscillator.connect(
        gain
    );

    gain.connect(
        ctx.destination
    );


    gain.gain.setValueAtTime(
        .0001,
        startTime
    );


    gain.gain.linearRampToValueAtTime(
        volume,
        startTime + .025
    );


    gain.gain.setValueAtTime(
        volume,
        startTime +
        Math.max(
            .03,
            duration - .06
        )
    );


    gain.gain.exponentialRampToValueAtTime(
        .0001,
        startTime + duration
    );


    oscillator.start(
        startTime
    );


    oscillator.stop(
        startTime +
        duration +
        .03
    );
}


/* =====================================================
   START MUSIC
   ===================================================== */

async function startChristmasMusic() {

    const ctx =
        getAudioContext();


    if (
        ctx.state === "suspended"
    ) {

        await ctx.resume();
    }


    if (musicPlaying) {
        return;
    }


    musicPlaying =
        true;

    musicStep =
        0;


    musicButton.textContent =
        "♫ Christmas Music — ON";


    scheduleMusic();
}


/* =====================================================
   MUSIC SCHEDULER
   ===================================================== */

function scheduleMusic() {

    if (!musicPlaying) {
        return;
    }


    const ctx =
        getAudioContext();


    const now =
        ctx.currentTime;


    const current =
        melody[
            musicStep %
            melody.length
        ];


    const note =
        current[0];

    const duration =
        current[1];


    if (
        note !== null
    ) {

        playTone(
            NOTE[note],
            now,
            duration * .9,
            .075,
            "triangle"
        );
    }


    if (
        musicStep % 2 === 0
    ) {

        const bassNote =
            bass[
                Math.floor(
                    musicStep / 2
                ) %
                bass.length
            ];


        playTone(
            NOTE[bassNote],
            now,
            .45,
            .035,
            "sine"
        );
    }


    /*
       Small rhythmic beat.
    */

    if (
        musicStep % 2 === 0
    ) {

        playTone(
            1100,
            now,
            .035,
            .007,
            "square"
        );
    }


    musicStep++;


    musicTimer =
        setTimeout(
            scheduleMusic,
            300
        );
}


/* =====================================================
   STOP MUSIC
   ===================================================== */

function stopChristmasMusic() {

    musicPlaying =
        false;


    if (
        musicTimer !== null
    ) {

        clearTimeout(
            musicTimer
        );

        musicTimer =
            null;
    }


    musicButton.textContent =
        "♫ Enable Christmas Music";
}


/* =====================================================
   MUSIC BUTTON
   ===================================================== */

musicButton.addEventListener(
    "click",
    async () => {

        if (musicPlaying) {

            stopChristmasMusic();

        } else {

            try {

                await startChristmasMusic();

            } catch (error) {

                console.error(
                    "Audio error:",
                    error
                );

                musicButton.textContent =
                    "♫ Audio unavailable";
            }
        }
    }
);


/* =====================================================
   MAIN LOOP
   ===================================================== */

function update() {

    updateBerCountdown();

    updateNewYearCountdown();

    requestAnimationFrame(
        update
    );
}


update();