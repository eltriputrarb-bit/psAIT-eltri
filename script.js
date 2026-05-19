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

// =======================================================================
// 1. TARUH KONSTANTA DI PALING ATAS (Gunakan backtick ` bukan kutip tunggal ')
// =======================================================================
const JALUR_FLASK_LOCAL = "http://192.168.100.5:5000"

// 2. ANTI-STUCK SYSTEM (Jika 9 detik wajah kurang cahaya, otomatis tembus)
setTimeout(() => {
    if (!isUnlocked) {
        console.log("Anti-Stuck Aktif: Membuka Gerbang.");
        // Pastikan variabel stream kamera abang sudah dioper ke sini jika memakai fungsi ini
        if (typeof stream !== 'undefined') eksekusiMembukaGerbang(stream);
    }
}, 9000);

// 3. PROSES STRUKTUR FETCH YANG BENAR
// Menggunakan variabel LINK_NGROK_SEKARANG yang dinamis menggantikan link teks palsu kemarin
fetch(`${LINK_NGROK_SEKARANG}/scan-wajah`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ image: imageBytes }) // Mengirim byte gambar webcam ke Python
})
.then(response => response.json())
.then(result => {
    if (result.status === "UNLOCKED") {
        if (typeof stream !== 'undefined') eksekusiMembukaGerbang(stream);
    }
})
.catch(error => console.error("Error mengirim data ke Flask:", error));

// --- LOGIKA ENGINE MODAL FULL SCREEN ---
const targetOpenModal = function(imageSrc) {
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("imgFull");
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Mengunci scroll web pas foto besar muncul
    }
};

// Ikat langsung ke window agar bisa diakses oleh 'onclick="openModal(this.src)"' dari HTML
window.openModal = targetOpenModal;

function closeModal() {
    const modal = document.getElementById("galleryModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Mengembalikan scroll web seperti semula
    }
}
