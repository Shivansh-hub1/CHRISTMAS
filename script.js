// --- ❄️ Snowfall Engine ---
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let flakes = [];

function initSnow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flakes = [];
    for (let i = 0; i < 150; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() * 1 + 0.5
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for (let f of flakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    }
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    for (let f of flakes) {
        f.y += f.d;
        f.x += Math.sin(f.y / 50);
        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    }
    requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', initSnow);
initSnow();
drawSnow();

// --- 🎆 Firework Logic ---
function triggerFireworks() {
    for (let i = 0; i < 50; i++) {
        const fw = document.createElement('div');
        fw.className = 'firework';
        
        // Random explosion direction
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        fw.style.setProperty('--tx', `${Math.cos(angle) * velocity}px`);
        fw.style.setProperty('--ty', `${Math.sin(angle) * velocity}px`);
        
        // Random colors
        const colors = ['#f8b229', '#d42426', '#ffffff', '#165b33'];
        fw.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Position at center
        fw.style.left = '50vw';
        fw.style.top = '50vh';
        
        document.body.appendChild(fw);
        setTimeout(() => fw.remove(), 1200);
    }
}

// --- 🎁 Interaction Logic ---
const gift = document.getElementById('gift');
const setupArea = document.getElementById('setupArea');
const messageArea = document.getElementById('messageArea');
const nameInput = document.getElementById('nameInput');
const personalizedName = document.getElementById('personalizedName');

gift.addEventListener('click', () => {
    const userName = nameInput.value.trim() || "Friend";
    personalizedName.innerText = `Wishing you a magical year, ${userName}! ✨`;
    
    gift.classList.add('open');
    triggerFireworks(); // 🎆 Boom!
    
    setTimeout(() => {
        setupArea.style.display = 'none';
        messageArea.classList.add('reveal');
    }, 500);
});

// --- ⏳ Countdown ---
function updateCountdown() {
    const now = new Date();
    let target = new Date(now.getFullYear(), 11, 25);
    if (now > target) target.setFullYear(target.getFullYear() + 1);
    const diff = target - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    document.getElementById('countdown').innerText = `🎄 ${days} Days until Christmas`;
}
updateCountdown();