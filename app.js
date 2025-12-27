const ornaments = ['🎈', '💖', '✨', '🌸'];
const colors = ['#ff69b4', '#ffb6c1', '#ffd700', '#ffffff'];
const container = document.getElementById('floating-container');
const btn = document.getElementById('surpriseBtn');
const music = document.getElementById('hbdMusic');
const secretArea = document.getElementById('secretArea');

// 1. Munculin hiasan (Tetap sama)
function spawnItem() {
    const item = document.createElement('div');
    item.className = 'floating-item';
    item.innerText = ornaments[Math.floor(Math.random() * ornaments.length)];
    item.style.left = Math.random() * 100 + 'vw';
    item.style.fontSize = Math.random() * 1.5 + 1 + 'rem';
    item.style.animationDuration = Math.random() * 5 + 7 + 's';
    container.appendChild(item);
    setTimeout(() => item.remove(), 12000);
}
setInterval(spawnItem, 600);

// 2. Efek Confetti (Tetap sama)
function burstConfetti() {
    for (let i = 0; i < 30; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = '50%';
        conf.style.top = '50%';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const destinationX = (Math.random() - 0.5) * 600;
        const destinationY = (Math.random() - 0.5) * 600;

        document.body.appendChild(conf);

        conf.animate([
            { transform: 'translate(0, 0)', opacity: 1 },
            { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
        ], { duration: 2000, easing: 'ease-out' }).onfinish = () => conf.remove();
    }
}

// 3. MODIFIKASI DISINI (Khusus buat HP)
btn.addEventListener('click', function() {
    // Pastikan volume full dan tidak mute
    music.muted = false;
    music.volume = 1.0;

    // Coba putar musik dengan penanganan error yang lebih baik
    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log("Mantap, musik jalan!");
        }).catch(error => {
            console.log("Masih diblokir, coba klik tombol speaker nanti.");
            // Kadang HP butuh interaksi kedua, tapi ini sudah usaha maksimal
        });
    }

    secretArea.classList.remove('hidden');
    this.style.display = 'none';
    setInterval(burstConfetti, 1000);
});

// 4. Fungsi Speaker (Supaya bisa dinyalain manual kalau auto-nya gagal)
function toggleMusic() {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}