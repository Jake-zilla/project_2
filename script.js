const defaultIcons = {
    red: "icons/fire icon.svg",
    dark: "icons/18+ icon.svg"
};

const challenges = [
    // DARK
    { text: "Kiss all over their neck for 30 seconds", type: "dark", icon: "icons/sex icon.svg" },
    { text: "Take an ice cube and give your partner neck kisses with it", type: "dark", icon: "icons/shot icon.svg" },
    { text: "Put an ice cube in your mouth, then kiss their body starting from chest down to their intimate zone", type: "dark", icon: "icons/ride icon.svg" },
    { text: "Take a dirty photo together", type: "dark", icon: "icons/lips icon.svg" },
    { text: "Put whip cream anywhere on your partner's body and eat it", type: "dark", icon: "icons/question mark icon.svg" },
    { text: "Tie your partner up and blindfold them, then do whatever you want for 3 minutes", type: "dark", icon: "icons/dog icon.svg" },
    { text: "Have a heavy makeout session on kitchen counter", type: "dark", icon: "icons/fire icon.svg" },
    { text: "Do doggy style in the kitchen", type: "dark", icon: "icons/sex icon.svg" },

    // RED
    { text: "Have a makeout session", type: "red", icon: "icons/sex icon.svg" },
    { text: "Take a shot", type: "red", icon: "icons/shot icon.svg" },
    { text: "Get on your partner and start riding for 1 minute", type: "red", icon: "icons/ride icon.svg" },
    { text: "French kiss your partner", type: "red", icon: "icons/lips icon.svg" },
    { text: "Remove your partner's underwear with only your mouth", type: "red", icon: "icons/question mark icon.svg" },
    { text: "Place your hand in your partner's pants for a minute", type: "red", icon: "icons/dog icon.svg" },
    { text: "Give your partner head for 1 minute", type: "red", icon: "icons/fire icon.svg" },
    { text: "Have sex for only 3 minutes and you have to stop when the timer stops", type: "red", icon: "icons/sex icon.svg" }
];

/* Rare Card */
const rareCard = {
    text: "Pick a card for your partner",
    type: "red",
    icon: "icons/fire icon.svg"
};

const RARE_CHANCE = 0.090;

// =======================
// ELEMENTS
// =======================

const card = document.getElementById("card");
const cardText = document.querySelector(".card-text");
const iconEl = document.getElementById("icon");
const turnDisplay = document.getElementById("turnNumber");

const challengeSelect = document.getElementById("challengeSelect");
const turnInput = document.getElementById("turnInput");
const scheduleBtn = document.getElementById("scheduleBtn");
const scheduledList = document.getElementById("scheduledList");
const controlPanel = document.querySelector(".control-panel");

// =======================
// STATE
// =======================

let isShuffling = false;
let turnCount = 0;
let scheduledTurns = {};
let rareActive = false;

// =======================
// INIT SELECT
// =======================

challenges.forEach((c, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = c.text;
    challengeSelect.appendChild(option);
});

// =======================
// RARE SUBMIT
// =======================

scheduleBtn.addEventListener("click", () => {
    if (!rareActive) return;

    const turn = parseInt(turnInput.value);
    const challengeIndex = challengeSelect.value;

    if (!turn || turn <= turnCount) return;

    // Schedule future challenge
    scheduledTurns[turn] = challenges[challengeIndex];
    renderScheduled();

    // Close rare state
    controlPanel.classList.add("hidden");
    rareActive = false;
    turnInput.value = "";

    // Reset select to default after submission
    challengeSelect.selectedIndex = 0;

    // Instantly replace rare card with a normal challenge
    const instantChallenge = getRandomChallenge();
    applyChallenge(instantChallenge);
});

// =======================
// MAIN CLICK
// =======================

card.addEventListener("click", () => {

    // 🚫 Block click if rare is active and not submitted
    if (isShuffling || rareActive) return;

    isShuffling = true;

    let elapsed = 0;
    const duration = 2000;
    const speed = 80;

    const animation = setInterval(() => {
        applyChallenge(getRandomChallenge());
        elapsed += speed;

        if (elapsed >= duration) {
            clearInterval(animation);

            turnCount++;
            turnDisplay.textContent = turnCount;

            let finalChallenge;

            if (scheduledTurns[turnCount]) {
                finalChallenge = scheduledTurns[turnCount];
                delete scheduledTurns[turnCount];
                renderScheduled();
            }
            else if (Math.random() < RARE_CHANCE) {
                finalChallenge = rareCard;
                rareActive = true;
                controlPanel.classList.remove("hidden");

                // Reset select to default when rare card appears
                challengeSelect.selectedIndex = 0;
            }
            else {
                finalChallenge = getRandomChallenge();
            }

            applyChallenge(finalChallenge);
            isShuffling = false;
        }
    }, speed);
});

// =======================
// HELPERS
// =======================

function getRandomChallenge() {
    return challenges[Math.floor(Math.random() * challenges.length)];
}

function applyChallenge(challenge) {
    cardText.textContent = challenge.text;

    card.classList.remove("card-red", "card-dark");
    card.classList.add(challenge.type === "red" ? "card-red" : "card-dark");

    iconEl.src = challenge.icon || defaultIcons[challenge.type];
}

function renderScheduled() {
    scheduledList.innerHTML = "";

    Object.keys(scheduledTurns).forEach(turn => {
        const div = document.createElement("div");
        div.textContent = `Turn ${turn}: ${scheduledTurns[turn].text}`;
        scheduledList.appendChild(div);
    });
}
