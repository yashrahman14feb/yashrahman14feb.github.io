// ==============================================
// 1. Setup & Configuration
// ==============================================
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const popupGif = document.getElementById('popup-gif');
const popupImg = document.getElementById('popup-img');
const popupText = document.getElementById('popup-text');
const closeBtn = document.getElementById('close-btn');
const mainCard = document.querySelector('.gif-container');

let yesScale = 1;
let noScale = 1;
let currentEmojis = ['❤️', '💖', '✨', '🌸'];
const noGifs = ["no.gif", "no2.gif", "no3.gif", "no4.gif","no5.gif", "no6.gif", "no7.gif", "no8.gif","no9.gif", "no10.gif", "no11.gif"]; 

// ==============================================
// 2. Background Effects
// ==============================================
function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = currentEmojis[Math.floor(Math.random() * currentEmojis.length)];
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -5vh;
        font-size: ${Math.random() * 20 + 20}px;
        opacity: 0.5;
        pointer-events: none;
        z-index: 0;
    `;
    document.body.appendChild(heart);
    heart.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-110vh)' }], { duration: 6000 });
    setTimeout(() => heart.remove(), 6000);
}

function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.cssText = `
        position: fixed; width: 4px; height: 4px; background: white;
        border-radius: 50%; left: ${Math.random() * 100}vw; top: ${Math.random() * 100}vh;
        pointer-events: none; z-index: 0;
    `;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1500);
}

setInterval(createHeart, 400);
setInterval(createSparkle, 200);

// ==============================================
// 3. Strict "Click" Logic (No Hover Jumps)
// ==============================================

noBtn.addEventListener('click', () => {
    // 1. Atmosphere Shift
    currentEmojis = ['💔', '😭', '🥀', '🥺'];
    if (navigator.vibrate) navigator.vibrate(80);

    // 2. Scale Yes Button
    yesScale += 0.45;
    yesBtn.style.transform = `scale(${yesScale})`;

    // 3. Move No Button ONLY after click
    const cardRect = mainCard.getBoundingClientRect();
    const padding = 30;
    let randomX, randomY;

    // Find a spot that doesn't overlap the main card
    for (let i = 0; i < 50; i++) {
        randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding);
        randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding);

        // Check if outside main card bounds
        if (
            randomX + noBtn.offsetWidth < cardRect.left || 
            randomX > cardRect.right || 
            randomY + noBtn.offsetHeight < cardRect.top || 
            randomY > cardRect.bottom
        ) break;
    }

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.zIndex = "1000";

    showPopup(false);
});

yesBtn.addEventListener('click', () => {
    currentEmojis = ['❤️', '💖', '✨'];
    showPopup(true);
});

function showPopup(isYes) {
    if (isYes) {
        // --- YES LOGIC ---
        closeBtn.style.display = 'none';
        popupText.innerText = "yayyy ami jantam hehe thank you! 💖";
        popupImg.src = "yes.gif";
        popupGif.style.backgroundColor = "rgba(255, 224, 240, 0.98)";
        popupText.style.color = "#ff4d6d";
        
        const audio = new Audio("yes.mp3");
        audio.play().catch(() => {});
        audio.onended = () => { window.location.href = "yes.html"; };
        setTimeout(() => { window.location.href = "yes.html"; }, 5000);
    } else {
        // --- NO LOGIC (MULTIPLE MESSAGES) ---
        closeBtn.style.display = 'block';

        // 1. Define your array of messages here
        const sadMessages = [
            "amon korla ? 🥺",
            "kosto pailam.... 😭",
            "Are you sure? 💔",
            "Heartbreak level: 100000000000000000% 😭",
            "Wait, bhule click lagse, tai na? 😱",
            "amio ful gular moto hoye gesi 🥀🥀🥀",
            "kann korbo 😭😭😭😭😭😭😭😭",
            "Mone hoy sob sesh 😭",
            "DHOKAAAAA........... 😱😱😱😱😱😱😱😱😱",
            "AHHHHHHHHHHHHHHHHHHH ⚰⚰⚰",
            "Jai amar bhanga mon ta niye hospital e 👨‍🦽👨‍🦽👨‍🦽"
        ];

        // 2. Pick a random message from the array
        const randomMessage = sadMessages[Math.floor(Math.random() * sadMessages.length)];
        popupText.innerText = randomMessage;

        // 3. Keep the random GIF logic
        popupImg.src = noGifs[Math.floor(Math.random() * noGifs.length)];
        
        popupGif.style.backgroundColor = "rgba(10, 10, 10, 0.98)";
        popupText.style.color = "#ffffff";
        new Audio("no.mp3").play().catch(() => {});
    }
    popupGif.style.display = 'flex';
}

closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    popupGif.style.display = 'none';
});