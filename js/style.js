document.getElementById('root').innerHTML = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent; /* FIX KOTAK BIRU ANDROID */
}

:root {
  color-scheme: light; /* Mengunci agar browser tidak otomatis jadi dark mode */
}

body {
    background-color: #ffffff !important; /* Paksa background jadi putih bersih */
    color: #000000 !important; /* Paksa teks tetap hitam */
}
/* --- NAVBAR LAPTOP --- */
.container-navbar {
    background: rgba(0, 0, 0, 0.9);
    padding: 10px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    width: 100%; top: 0; left: 0;
    z-index: 10000;
    height: 75px;
}

.menu-home {
    display: none;
}

/* --- ANIMASI TOMBOL HAMBURGER JADI X --- */
.menu-toggle {
    display: none; /* Sembunyi di laptop */
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 10001; /* Pastikan di atas sidebar */
    transition: 0.3s;
}

.menu-toggle span {
    display: block;
    width: 30px;
    height: 3px;
    background: white;
    border-radius: 5px;
    transition: 0.4s cubic-bezier(0.68, -0.6, 0.32, 1.6); /* Efek muter pro */
}

/* KETIKA AKTIF (JADI X) */
.menu-toggle.is-active span:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.menu-toggle.is-active span:nth-child(2) {
    opacity: 0; /* Garis tengah hilang */
}

.menu-toggle.is-active span:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}

/* Memastikan di HP tombolnya muncul */
@media screen and (max-width: 768px) {
    .menu-toggle { display: flex; }
}

.logo-link { display: flex; align-items: center; gap: 15px; text-decoration: none; color: white; }
.logo { width: 45px !important; height: 45px !important; }
.brand-text { font-weight: bold; text-transform: uppercase; }

/* --- TAMPILAN LAPTOP (Layar Lebar) --- */
@media screen and (min-width: 769px) {
    .nav-home { display: none !important; } /* Sembunyikan Home */
    
    .ul-navbar {
        display: flex;
        list-style: none;
        gap: 30px;
    }

    .menu-item-btn {
        text-decoration: none;
        color: white !important;
        font-weight: 700;
        background: none !important;
        border: none !important;
    }
    
    .menu-item-btn i { display: none; } /* Sembunyi ikon di laptop */
    .menu-toggle { display: none; }
}

/* --- TAMPILAN HP (Android Sidebar) --- */
@media screen and (max-width: 768px) {
    .container-navbar {
        padding: 10px 20px;
        height: 70px;
    }

    .menu-toggle {
        display: flex;
        flex-direction: column;
        gap: 5px;
        z-index: 10001; /* Di atas sidebar */
    }

    /* Animasi X */
    .menu-toggle.is-active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
    .menu-toggle.is-active span:nth-child(2) { opacity: 0; }
    .menu-toggle.is-active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }

    .ul-navbar {
        position: fixed;
        top: 0; right: -100%;
        width: 300px; height: 100vh;
        background: #0f0f0f;
        display: flex;
        flex-direction: column;
        justify-content: flex-start; /* Menu mulai dari atas */
        padding-top: 100px; /* Jarak agar menu di bawah tombol X */
        align-items: center;
        gap: 15px;
        transition: 0.5s ease;
        border-top-left-radius: 40px;
        border-bottom-left-radius: 40px;
        list-style: none;
    }

    .ul-navbar.active { right: 0; }

    .menu-item-btn {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.05);
        padding: 15px 25px;
        width: 260px;
        border-radius: 50px;
        color: white !important;
        text-decoration: none;
        font-size: 14px;
    }

    .active-btn { background: #0061f2 !important; }
}

/* --- FIX FONT HERO UNTUK HP --- */
@media screen and (max-width: 768px) {
    .hero-content h1 {
        font-size: 24px !important;      /* Ukuran font ideal di HP */
        font-weight: 800 !important;     /* Biar tebel mantap */
        line-height: 1.2 !important;     /* Jarak antar baris biar gak renggang */
        text-align: center !important;   /* Rata tengah wajib */
        display: block !important;
        width: 85% !important;           /* Biar otomatis turun jadi 2 baris */
        margin: 0 auto !important;       /* Biar tetep di tengah layar */
        text-transform: uppercase;       /* Tetap huruf besar semua */
        text-shadow: 2px 2px 10px rgba(0,0,0,0.5); /* Biar kebaca jelas di background terang */
    }
}

/* --- TETAP GEDE DI LAPTOP --- */
@media screen and (min-width: 769px) {
    .hero-content h1 {
        font-size: 60px !important;
    }
}

/* --- HERO SECTION --- */
.hero {
    height: 100vh;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("ass");
    background-size: cover; background-position: center;
    display: flex; justify-content: center; align-items: center;
    color: white; text-align: center;
}
.hero h1 { font-size: 50px; text-shadow: 0 4px 20px rgba(0,0,0,0.8); }

/* --- KTP CARD --- */
.ktp-card {
    width: 500px; margin: 50px auto; border-radius: 15px;
    position: relative; overflow: hidden; background: url('ktpp.png') center/cover;
    color: white; box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.ktp-card::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 1; }
.content { position: relative; z-index: 2; padding: 20px; }

/* Biar menu PUBLIC PROFILE tetap rapi di kanan laptop */
@media screen and (min-width: 769px) {
    .ul-navbar {
        display: flex;
        gap: 20px;
    }
    
    /* Hilangkan background tombol & ikon di laptop biar cuma teks elegan */
    .menu-item-btn {
        background: none !important;
        border: none !important;
        padding: 0 !important;
    }
    .menu-item-btn i { display: none; }
}

/* --- SETTING HP (SIDEBAR) --- */
@media screen and (max-width: 768px) {
    /* Munculkan kembali menu HOME khusus di HP */
    .menu-home {
        display: block; 
    }
    
    /* Style tombol biru seperti screenshot Abang */
    .menu-item-btn {
        display: flex;
        align-items: center;
        gap: 15px;
        background: rgba(255, 255, 255, 0.05);
        padding: 15px 25px;
        width: 250px;
        border-radius: 50px;
    }
}
/* --- ANIMASI TOMBOL MENU --- */
.menu-toggle span {
    transition: 0.4s;
    border-radius: 10px;
}

/*/////////////////////////////////////////////////////////////////*/

.profile-section {
    background-color: #ffffff; /* Warna gelap sesuai gambar */
    padding: 60px 10%;
    color: #1d1c1c;
}

.container-flex {
    display: flex;
    align-items: center;
    gap: 50px;
    flex-wrap: wrap; /* Biar gak rusak di layar kecil */
}

/* Mengatur area gambar agar tidak berantakan */
.image-wrapper {
    position: relative; /* Kunci posisi */
    display: inline-block;
}

.img-main {
    width: 100%;
    max-width: 400px;
    border-radius: 15px;
    display: block;
}

.floating-logo {
    position: absolute;
    bottom: -15px; /* Biar agak keluar dikit dari frame foto */
    right: -15px;  /* Biar estetik kayak watermark pro */
    width: 100px;  /* Ukuran pas buat di HP */
    z-index: 10;
    
    /* Tambahin glow dikit biar logo hijaunya nyala */
    filter: drop-shadow(0 0 10px rgba(0, 255, 200, 0.5));
}

.floating-logo img {
    width: 100%;
    background: transparent !important; /* Jaminan gak ada kotak putih */
}
/* Mengatur logo/gambar transparan agar tidak lari ke bawah */
.img-small-box {
    position: absolute;
    bottom: -30px;
    right: -20px;
    width: 150px;
    z-index: 5;
}

.img-logo {
    width: 100%;
}

/* Mengatur Teks */
.text-wrapper {
    flex: 1;
    min-width: 300px;
}

.label-eltri {
    color: #ffaa00;
    font-weight: bold;
    letter-spacing: 2px;
}

.name-title {
    font-size: 35px;
    margin: 10px 0;
    font-family: 'Montserrat', sans-serif;
}

/* Gaya untuk "Tuhan Yang Maha Esa" (Seni, anggun & khidmat) */
.visi-text {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 24px;
    font-style: italic; /* Membuat teks miring elegan */
    font-weight: 700;
    color: #d4af37; /* Sentuhan warna emas mewah agar bernilai sakral */
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    margin-top: 5px;
}



/*/////////////////////////////////////////////////////////////////*/

.hero-about {
    /* PANGGIL GAMBAR DI SINI */
    /* Ganti 'profile.png' dengan nama file background kamu */
    background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('MALAIKAT.jpg');
    
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Biar efeknya keren pas di-scroll */
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.main-footer {
    text-align: center;
    padding: 30px;
    background: #ffffff; /* Warna putih biar bersih */
    color: #888;
    font-size: 13px;
    width: 100%;
    position: relative; /* Memastikan dia di bawah konten */
    clear: both; /* Menghapus efek float/flex dari atas */
}

.public-profile {
    padding: 0; /* Hilangkan padding samping di HP */
    width: 100%;
    display: flex;
    justify-content: center;
}

.profile-container {
    background: #ffffff;
    display: flex;
    flex-direction: column; /* Wajib supaya gambar & teks susun vertikal di HP */
    width: 100%; /* Biar memenuhi lebar layar */
    max-width: 1000px; /* Batas maksimal pas di laptop */
    margin: 0 auto;
    border-radius: 0; /* Di HP biasanya lebih bagus tanpa lengkungan di pinggir layar */
    overflow: hidden;
}
/* Kolom Kiri (Abu-abu) */
.side-bar {
    background: #d1d1d1;
    width: 35%;
    padding: 40px 25px;
}

.photo-frame img {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.side-content {
    font-family: 'Roboto', sans-serif;
    color: #333333; /* Warna teks abu-abu gelap yang nyaman dibaca */
}

.side-content h3 {
    font-family: 'Montserrat', sans-serif;
    font-size: 20px;
    font-weight: 800; /* Tebal dan kokoh */
    color: #0088cc; /* Warna biru cerah yang keren */
    letter-spacing: 1.5px; /* Jarak huruf yang estetik */
    border-bottom: 2px solid #0088cc; /* Garis bawah biru pembatas */
    padding-bottom: 5px;
    margin-top: 25px;
    margin-bottom: 12px;
    text-transform: uppercase;
}

.side-content p {
    font-family: 'Montserrat', sans-serif; /* Menggunakan font modern */
    font-size: 16px; /* Ukuran pas, tidak kekecilan */
    font-weight: 500; /* Sedikit tebal agar tegas */
    color: #2c3e50; /* Warna biru gelap charcoal yang elegan, bukan biru pudar jadul */
    line-height: 1.8; /* Memberi ruang napas antar baris */
    margin-bottom: 15px; /* Jarak antar baris teks */
    letter-spacing: 0.3px; /* Jarak antar huruf yang rapi */
}

/* Kolom Kanan (Putih) */
.main-content {
    width: 65%;
    padding: 50px;
    color: #333;
}

/* Kolom Kanan (Putih) */
.main-content {
    width: 65%;
    padding: 50px;
    color: #333;
}

.profile-name {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: 2px;
    margin: 0;
}

.line-gold {
    border: none;
    height: 2px;
    background: #333;
    margin: 15px 0 30px;
}

.info-section h2 {
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    margin-bottom: 15px;
}

.item {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    margin-bottom: 20px;
}

.achievement-list {
    padding-left: 20px;
    font-size: 14px;
}

.achievement-list li {
    margin-bottom: 10px;
}

@media (max-width: 767px) {
    .profile-container {
        width: 95% !important; /* Sisakan sedikit celah di pinggir agar bagus */
        max-width: 100vw;
        margin: 10px auto !important;
        display: flex;
        flex-direction: column; /* Wajib: agar bagian putih pindah ke bawah, bukan ke samping */
    }
    .hero-about {
        background-attachment: scroll !important; /* Biar background gak lari di HP */
        padding: 40px 0 !important;
    }

    /* 2. Pastikan kartu profil memenuhi lebar layar */
    .profile-container {
        display: flex !important;
        flex-direction: column !important;
        width: 100% !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    /* 3. Atur teks agar memenuhi lebar kotak putih */
    .side-bar, .main-content {
        width: 100% !important;
        padding: 20px !important;
        box-sizing: border-box; /* Memastikan padding tidak membuat elemen meluber */
    }

    /* 4. Perbesar sedikit font deskripsi */
    .side-content p, .main-content p {
        font-size: 15px !important;
        line-height: 1.6;
        text-align: justify; /* Agar teks rapi rata kiri-kanan */
    }
    /* Paksa baris pendidikan untuk turun ke bawah (vertikal) */
    .item {
        display: block !important; 
        margin-bottom: 20px;
        padding-bottom: 5px;
        border-bottom: 1px dashed #eee; /* Opsional: pemisah tipis */
    }

    /* Nama Sekolah dibuat memenuhi baris pertama */
    .item strong {
        display: block;
        width: 100%;
        font-size: 16px !important;
        margin-bottom: 4px;
    }

    /* Tahun dipindah tepat di bawah nama sekolah */
    .item span {
        display: block;
        font-size: 14px !important;
        color: #666;
        text-align: left; /* Rata kiri agar searah dengan teks sekolah */
    }

    html, body {
        overflow-x: hidden; /* Menghilangkan scroll ke samping */
        width: 100%;
        margin: 0;
        padding: 0;
    }

    .main-content {
        width: 100% !important;
        box-sizing: border-box; /* Padding tidak akan menambah lebar kotak */
    }

}
/* --- TAMPILAN LAPTOP --- */
@media (min-width: 768px) {
    .profile-container {
        flex-direction: row !important;
        width: 60%; /* Ubah dari 80% ke 60% jika ingin lebih ramping, atau sesuaikan */
        max-width: 1000px; /* Batas maksimal agar tidak terlalu lebar di monitor besar */
        margin: 50px auto !important; /* Memberikan jarak atas-bawah agar pas di tengah */
    }

    body, .hero-about {
    background-image: url('MALAIKAT.jpg');
    background-size: cover !important; /* WAJIB: Memaksa gambar menutupi seluruh area layar */
    background-position: center !important; /* Biar gambar tetap di tengah */
    background-repeat: no-repeat !important; /* Jangan sampai gambarnya pecah atau berulang */
    background-attachment: fixed; /* Biar background tetap diam saat di-scroll */
    min-height: 100vh; /* Pastikan tinggi background minimal setinggi layar */
    margin: 0;

    }
}


/* ==========================================================================
   STYLE FOOTER SOSIAL MEDIA (FIXED ANDROID & ANTI-HIGHLIGHT)
   ========================================================================== */
.social-footer {
    background-color: #111 !important;
    padding: 10px 0 30px 0; /* Jarak atas tipis, jarak bawah aman */
    text-align: center;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
}

.social-footer h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-family: 'Yellowtail', cursive; 
    color: #ff8c00;
    font-size: 28px;
    letter-spacing: 1px;
}

.social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px; /* Sesuai setingan layout Abang */
}

/* Base Box Tombol Sosial Media (Android Friendly) */
.social-icons a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%; /* Bentuk Bulat */
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: 1px solid rgba(255, 255, 255, 0.08);
    
    /* Kunci utama: Menghilangkan kotak biru jelek saat di-tap di HP Android */
    -webkit-tap-highlight-color: transparent;
}

/* WARNA IKON GLOBAL (Dipaksa Putih & Ukuran Pas) */
.social-icons a i {
    color: #ffffff !important; 
    font-size: 24px !important; /* Ukuran pas dan kelihatan gahar */
    transition: all 0.3s ease;
}

/* --- TOMBOL INSTAGRAM (Warna Box & Efek Hover) --- */
.social-icons a.instagram { 
    background-color: #e4405f !important; /* Warna Background Box Asli Instagram */
}
.social-icons a.instagram:hover {
    background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888) !important; /* Gradasi premium pas di-hover */
    box-shadow: 0 0 20px rgba(228, 64, 95, 0.6);
    transform: translateY(-4px) scale(1.05);
}

/* --- TOMBOL X LOGO (Warna Box & Efek Hover) --- */
.social-icons a.x-logo {
    background-color: #000000 !important; /* Box dasar hitam pekat khas X */
    border: 1px solid rgba(255, 255, 255, 0.2);
}
.social-icons a.x-logo:hover {
    background-color: #ffffff !important; /* Box berubah putih solid */
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
    border-color: #ffffff !important;
    transform: translateY(-4px) scale(1.05);
}
/* Pas di-hover, ikon dalam X berubah hitam supaya kontras di atas box putih */
.social-icons a.x-logo:hover i {
    color: #000000 !important;
}

/* Styling Khusus untuk Ikon SVG X */
.social-icons a.x-logo .svg-x {
    width: 22px; /* Ukuran pas disamakan dengan Instagram */
    height: 22px;
    fill: #ffffff; /* Memaksa warna SVG jadi putih murni */
    transition: all 0.3s ease;
}

/* Pas di-hover, warna logo dalam SVG berubah jadi hitam pekat */
.social-icons a.x-logo:hover .svg-x {
    fill: #000000;
}

.icon {
    width: 40px;
    height: 40px;
    border-radius: 50%; /* Membuat ikon bulat sempurna */
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    font-size: 20px;
    transition: 0.3s;
}

/* Warna Background Box-nya */
.instagram { 
    background-color: #e4405f; 
}

/* WARNA IKONNYA (Harus dipaksa putih) */
.instagram i {
    color: white !important; 
    font-size: 24px; /* Biar ukurannya pas dan kelihatan */
}

/* Tambahan biar pas diklik di Android gak muncul kotak biru */
.social-icons a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
}

.icon:hover {
    transform: scale(1.2); /* Efek membesar saat disentuh */
    opacity: 0.8;
}

/* --- CUSTOM TOMBOL NAVBAR GAHAR --- */
.btn-gahar {
    font-family: 'Montserrat', sans-serif !important;
    font-weight: 800 !important;
    font-size: 13px !important;
    letter-spacing: 1.5px; /* Jarak huruf biar kayak brand mahal */
    color: #ffffff !important;
    padding: 8px 20px !important;
    border: 2px solid #0088cc; /* Frame biru gahar */
    border-radius: 50px; /* Bentuk kapsul biar modern */
    background: transparent;
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(0, 136, 204, 0.5);
}

/* Pas kursor nempel (Hover) */
.btn-gahar:hover {
    background: #0088cc; /* Full biru */
    color: #ffffff !important;
    box-shadow: 0 0 20px rgba(0, 136, 204, 0.8); /* Efek glow nendang */
    transform: translateY(-2px); /* Tombol kayak naik sedikit */
}

.info-section h2 {
    color: #ff8800;
}

.profile-name {
    color: #ff8800;
}

.line-gold {
    border-color: #ff8800;
}

`;