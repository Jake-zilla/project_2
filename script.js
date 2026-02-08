const defaultIcons = {
    red: "icons/fire icon.svg",
    dark: "icons/18+ icon.svg"
};

const challenges = [
    // DARK
    { text: "Have a makeout session", type: "dark", icon: "icons/sex icon.svg" },
    { text: "Take a shot", type: "dark", icon: "icons/shot icon.svg" },
    { text: "Get on your partner and start riding for 1 minute", type: "dark", icon: "icons/ride icon.svg" },
    { text: "French kiss your partner", type: "dark", icon: "icons/lips icon.svg" },
    { text: "Remove your partner's underwear with only your mouth", type: "dark", icon: "icons/question mark icon.svg" },
    { text: "Place your hand in your partner's pants for a minute", type: "dark", icon: "icons/dog icon.svg" },
    { text: "Give your partner head for 1 minute", type: "dark", icon: "icons/fire icon.svg" },
    { text: "Have sex for only 3 minutes and you have to stop when the timer stops", type: "dark", icon: "icons/sex icon.svg" },

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

// =======================
// ELEMENTS
// =======================

const card = document.getElementById("card");
const cardText = document.querySelector(".card-text");
const iconEl = document.getElementById("icon");

// =======================
// STATE
// =======================

let isShuffling = false;

// =======================
// EVENT LISTENER
// =======================

card.addEventListener("click", () => {
    if (isShuffling) return;

    isShuffling = true;

    let elapsed = 0;
    const duration = 2000;
    const speed = 80;

    const animation = setInterval(() => {
        const tempChallenge = getRandomChallenge();
        applyChallenge(tempChallenge);

        elapsed += speed;

        if (elapsed >= duration) {
            clearInterval(animation);

            const finalChallenge = getRandomChallenge();
            applyChallenge(finalChallenge);

            isShuffling = false;
        }
    }, speed);
});

// =======================
// FUNCTIONS
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
