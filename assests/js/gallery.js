// Menyuntikkan HTML secara gaib ke dalam div id="root"
document.getElementById('root').innerHTML = `
    <div id="galleryModal" class="modal-lightbox" onclick="closeModal()">
        <span class="close-btn" onclick="closeModal(); event.stopPropagation();">&times;</span>
        <img class="modal-content" id="imgFull" alt="Preview Ukuran Penuh">
    </div>

    <nav class="container-navbar">
        <div class="nav-left">
            <a href="index.html" class="logo-link">
                <img src="assests/images/logo.png" class="logo" alt="Logo"> 
                <span class="brand-text">ELTRI PROJECT</span>
            </a>
        </div>

        <div class="nav-right">
            <ul class="ul-navbar" id="nav-links">
                <li><a href="index.html" class="menu-item-btn btn-gahar"><i class="fas fa-home"></i> HOME</a></li>
                <li class="mobile-only"><a href="gallery.html" class="menu-item-btn active-btn btn-gahar"><i class="fas fa-images"></i> GALLERY</a></li>
                <li><a href="Proyek.html" class="menu-item-btn btn-public btn-gahar"><i class="fas fa-user"></i> PUBLIC PROFILE</a></li>
            </ul>
            
            <div class="menu-toggle" id="mobile-menu" onclick="toggleMenu(); event.stopPropagation();">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <main class="gallery-container">

        <header class="gallery-header">
            <h1>MY <span>GALLERY</span></h1>
            <p>Koleksi documentation, proyek gahar, dan karya terbaik dari ELTRI PROJECT.</p>
        </header>

        <section class="gallery-grid">
            
            <div class="gallery-card">
                <div class="card-img-wrapper">
                    <img src="assests/images/mkssr.jpg" alt="Lokasi Makassar" onclick="openModal(this.src)">
                </div>
                <div class="card-info">
                    <h3>LOKASI: MAKASSAR</h3>
                    <p>Lokasi: Makassar Sudut pandang sinematik jalanan kota 15/05,mei,2026</p>
                </div>
            </div>

            <div class="gallery-card">
                <div class="card-img-wrapper">
                    <img src="assests/images/bendara.jpg" alt="Lokasi Makassar" onclick="openModal(this.src)">
                </div>
                <div class="card-info">
                    <h3>LOKASI: MAKASSAR</h3>
                    <p>jalan bendara 20/05,mei 2026</p>
                </div>
            </div>

            <div class="gallery-card">
                <div class="card-img-wrapper">
                    <img src="assests/images/smakara.jpg" alt="SMAKARA" onclick="openModal(this.src)">
                </div>
                <div class="card-info">
                    <h3>LOKASI:SMAKARA</h3>
                    <p>SAYA FOTO PAKAI CAMERA SMAKARA 07/12,DESEMBER,2018</p>
                </div>
            </div>

</section>

    </main>
`;

// ==========================================================================
// OPERASIONAL SCRIPT LOGIC (DITARUH DI LUAR STRING BIAR TIDAK COMPLIANCE ERROR)
// ==========================================================================

// 1. Fungsi Buka-Tutup Hamburger Menu HP
function toggleMenu() {
    const menu = document.getElementById("nav-links");
    const burger = document.getElementById("mobile-menu");
    if (menu && burger) {
        menu.classList.toggle("active");
        burger.classList.toggle("is-active");
    }
}

// 2. Otomatis tutup sidebar HP jika area luar diklik jari
document.addEventListener('click', function(event) {
    const menu = document.getElementById("nav-links");
    const burger = document.getElementById("mobile-menu");
    
    if (menu && burger) {
        if (!menu.contains(event.target) && !burger.contains(event.target)) {
            menu.classList.remove("active");
            burger.classList.remove("is-active");
        }
    }
});

// 3. Fungsi Buka Foto Full Screen (Sinkron ke `.modal-lightbox.show` di CSS Lu)
function openModal(imageSrc) {
    const modal = document.getElementById("galleryModal");
    const modalImg = document.getElementById("imgFull");
    if (modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add("show");
        document.body.style.overflow = "hidden"; // Mengunci scroll utama biar estetik
    }
}

// 4. Fungsi Tutup Foto Full Screen (Lewat Tombol X atau Klik Area Hitam)
function closeModal() {
    const modal = document.getElementById("galleryModal");
    if (modal) {
        modal.classList.remove("show");
        document.body.style.overflow = "auto"; // Mengembalikan scroll utama
    }
}

// ==========================================================================
// SISTEM PROTEKSI KEAMANAN TINGKAT TINGGI ELTRI PROJECT
// ==========================================================================

// ANTI KLIK KANAN
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('System Anti error, Dilarang mencuri kodingan ELTRI PROJECT! 🦾');
});

// ANTI BLOCK TEKS / COPY PASTE
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// BARRICADE LOCK INDEPEDENT: F12 / INSPECT ELEMENT / CTRL+U
document.addEventListener('keydown', function(e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && e.key === "I") || 
        (e.ctrlKey && e.shiftKey && e.key === "C") || 
        (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
        alert('Fitur Inspect Element Dikunci, Bang! 🔒');
    }
});
