/* =====================================================
   TARGET DATES
   ===================================================== */

const berTarget = new Date(
    2026,
    8,
    1,
    0,
    0,
    0,
    0
);

const newYearTarget = new Date(
    2027,
    0,
    1,
    0,
    0,
    0,
    0
);


/* =====================================================
   ELEMENTS
   ===================================================== */

const berSection =
    document.getElementById("berSection");

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

const christmasOverlay =
    document.getElementById(
        "christmasOverlay"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


/* =====================================================
   TIMEZONE
   ===================================================== */

timezone.textContent =
    "LOCAL TIMEZONE • " +
    Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone;


/* =====================================================
   STATE
   ===================================================== */

let christmasStarted = false;

let audioContext = null;

let musicStarted = false;


/* =====================================================
   BER MONTHS COMPLETION
   ===================================================== */

function completeBerMonths() {

    /*
     * Add this class to remove the
     * Ber Months timer from the layout.
     */

    document.body.classList.add(
        "ber-complete"
    );


    /*
     * Replace the reminder.
     */

    reminder.innerHTML = `

        <strong>
            NEW YEAR'S TARGET
        </strong>

        <br>

        January 1, 2027 —
        12:00:00 AM

        <br>

        Keep watching.
        The New Year countdown continues
        until midnight.

    `;
}


/* =====================================================
   BER MONTHS COUNTDOWN
   ===================================================== */

function updateBerCountdown() {

    const remaining =
        berTarget.getTime() -
        Date.now();


    if (remaining <= 0) {

        berDays.textContent = "00";
        berHours.textContent = "00";
        berMinutes.textContent = "00";
        berSeconds.textContent = "00";


        if (!christmasStarted) {

            christmasStarted = true;

            completeBerMonths();

            startChristmasMode();
        }

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
            (totalSeconds % 86400)
            / 3600
        );

    const m =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );

    const s =
        totalSeconds % 60;


    berDays.textContent =
        String(d).padStart(2,"0");

    berHours.textContent =
        String(h).padStart(2,"0");

    berMinutes.textContent =
        String(m).padStart(2,"0");

    berSeconds.textContent =
        String(s).padStart(2,"0");
}


/* =====================================================
   NEW YEAR COUNTDOWN
   ===================================================== */

function updateNewYearCountdown() {

    const remaining =
        newYearTarget.getTime() -
        Date.now();


    if (remaining <= 0) {

        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

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
            (totalSeconds % 86400)
            / 3600
        );

    const m =
        Math.floor(
            (totalSeconds % 3600)
            / 60
        );

    const s =
        totalSeconds % 60;


    days.textContent =
        String(d).padStart(2,"0");

    hours.textContent =
        String(h).padStart(2,"0");

    minutes.textContent =
        String(m).padStart(2,"0");

    seconds.textContent =
        String(s).padStart(2,"0");
}


/* =====================================================
   CHRISTMAS MODE
   ===================================================== */

function startChristmasMode() {

    document.body.classList.add(
        "christmas-mode"
    );


    christmasOverlay.classList.add(
        "active"
    );


    createSnow();


    /*
     * Vibrate if the device/browser allows it.
     */

    if ("vibrate" in navigator) {

        navigator.vibrate([
            150,
            80,
            150,
            80,
            300
        ]);
    }


    /*
     * Attempt to start music.
     */

    playChristmasMusic();


    /*
     * Hide popup after six seconds.
     */

    setTimeout(() => {

        christmasOverlay.classList.remove(
            "active"
        );

    },6000);
}


/* =====================================================
   SNOW
   ===================================================== */

function createSnow() {

    const container =
        document.getElementById(
            "snowContainer"
        );


    if (container.children.length > 0) {
        return;
    }


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const snow =
            document.createElement("div");


        snow.className =
            "snowflake";


        snow.textContent =
            Math.random() > .5
                ? "❄"
                : "•";


        snow.style.left =
            Math.random() * 100 + "%";


        snow.style.fontSize =
            (
                8 +
                Math.random() * 16
            ) + "px";


        snow.style.animationDuration =
            (
                5 +
                Math.random() * 9
            ) + "s";


        snow.style.animationDelay =
            Math.random() * 8 + "s";


        container.appendChild(
            snow
        );
    }
}


/* =====================================================
   CHRISTMAS MUSIC
   ===================================================== */

const christmasMelodies = [

    {
        name: "Jingle Bells",

        notes: [
            [659.25,0.00,.25],
            [659.25,0.30,.25],
            [659.25,0.60,.50],

            [659.25,1.20,.25],
            [659.25,1.50,.25],
            [659.25,1.80,.50],

            [659.25,2.40,.25],
            [783.99,2.70,.25],
            [523.25,3.00,.35],
            [587.33,3.40,.35],
            [659.25,3.80,.60]
        ]
    },


    {
        name: "O Christmas Tree",

        notes: [
            [659.25,0.00,.40],
            [783.99,0.45,.20],
            [880.00,0.70,.40],

            [880.00,1.15,.40],
            [783.99,1.60,.25],
            [659.25,1.90,.50],

            [587.33,2.50,.40],
            [659.25,2.95,.25],
            [783.99,3.25,.50],

            [659.25,3.85,.40],
            [587.33,4.30,.30],
            [523.25,4.65,.70]
        ]
    },


    {
        name: "Deck the Halls",

        notes: [
            [659.25,0.00,.25],
            [587.33,0.30,.25],
            [523.25,0.60,.25],
            [587.33,0.90,.25],
            [659.25,1.20,.25],
            [659.25,1.50,.25],
            [659.25,1.80,.40],

            [587.33,2.40,.25],
            [587.33,2.70,.25],
            [587.33,3.00,.40],

            [659.25,3.60,.25],
            [783.99,3.90,.25],
            [880.00,4.20,.40]
        ]
    },


    {
        name:
            "We Wish You a Merry Christmas",

        notes: [
            [783.99,0.00,.30],
            [880.00,0.35,.30],
            [783.99,0.70,.30],
            [659.25,1.05,.30],

            [587.33,1.40,.30],
            [659.25,1.75,.30],
            [783.99,2.10,.50],

            [783.99,2.75,.30],
            [880.00,3.10,.30],
            [783.99,3.45,.30],
            [659.25,3.80,.30],

            [587.33,4.15,.30],
            [659.25,4.50,.30],
            [523.25,4.85,.70]
        ]
    }

];


/* =====================================================
   AUDIO
   ===================================================== */

function createAudioContext() {

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
    }

    return audioContext;
}


function playNote(
    frequency,
    startTime,
    duration
) {

    const ctx =
        createAudioContext();


    const oscillator =
        ctx.createOscillator();


    const gain =
        ctx.createGain();


    oscillator.type =
        "triangle";


    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        0,
        startTime
    );


    gain.gain.linearRampToValueAtTime(
        .09,
        startTime + .025
    );


    gain.gain.exponentialRampToValueAtTime(
        .001,
        startTime + duration
    );


    oscillator.connect(gain);

    gain.connect(ctx.destination);


    oscillator.start(startTime);

    oscillator.stop(
        startTime +
        duration +
        .05
    );
}


/* =====================================================
   SHUFFLE MUSIC
   ===================================================== */

function playChristmasMusic() {

    if (musicStarted) {
        return;
    }


    musicStarted = true;


    const ctx =
        createAudioContext();


    if (
        ctx.state ===
        "suspended"
    ) {

        ctx.resume();
    }


    const melody =
        christmasMelodies[
            Math.floor(
                Math.random() *
                christmasMelodies.length
            )
        ];


    musicButton.textContent =
        "♫ " + melody.name;


    const start =
        ctx.currentTime + .1;


    melody.notes.forEach(note => {

        playNote(
            note[0],
            start + note[1],
            note[2]
        );

    });


    const finalNote =
        melody.notes[
            melody.notes.length - 1
        ];


    const duration =
        finalNote[1] +
        finalNote[2];


    setTimeout(() => {

        musicStarted = false;


        if (
            document.body
                .classList
                .contains(
                    "christmas-mode"
                )
        ) {

            playChristmasMusic();
        }

    },(duration + .8) * 1000);
}


/* =====================================================
   MUSIC BUTTON
   ===================================================== */

musicButton.addEventListener(
    "click",
    () => {

        playChristmasMusic();

    }
);


/* =====================================================
   UPDATE LOOP
   ===================================================== */

function updateAll() {

    updateBerCountdown();

    updateNewYearCountdown();

    requestAnimationFrame(
        updateAll
    );
}


/* =====================================================
   START
   ===================================================== */

updateAll();
