function toggleMenu() {
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Ini yang bikin garis jadi X dan menu muncul
    menuBtn.classList.toggle('is-active'); 
    navLinks.classList.toggle('active');
}

// 4. LOGIKA LOADING SCREEN: Menghilangkan preloader saat seluruh halaman selesai dimuat
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        // Beri sedikit jeda 500ms biar animasinya kelihatan mulus dulu
        setTimeout(function() {
            loadingScreen.classList.add('fade-out');
        }, 500);
    }
});

// ANTI-STUCK SYSTEM (Jika 7 detik wajah kurang cahaya/tidak terbaca, otomatis tembus)
setTimeout(() => {
    if (!isUnlocked) {
        console.log("Anti-Stuck Aktif: Membuka Gerbang.");
        eksekusiMembukaGerbang(stream);
    }
}, 9000);

fetch('https://ISI_LINK_NGROK_BARU_LU_DISINI.ngrok-free.app/scan-wajah', { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: imageBytes }) // Mengirim byte gambar webcam ke Python
})
