/* ==========================================================================
   SCRIPT PROTEKSI ELTRI PROJECT - ANTI KLIK KANAN & INSPECT ELEMENT
   ========================================================================== */

// 1. ANTI KLIK KANAN: Mengunci menu klik kanan browser + Muncul Alert Gahar
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert('Sistem keamanan Anti error Dilarang mencuri kodingan ELTRI PROJECT!');
});

// 2. ANTI BLOCK TEKS / SELECT: Orang gak bisa seret/blok teks buat di-copy
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
});

// 3. LOCK F12 & SHORTCUT INSPECT: Mematikan tombol rahasia DevTools (F12, Ctrl+Shift+I, Ctrl+U)
document.addEventListener('keydown', function(e) {
    if (e.key === "F12" || 
        (e.ctrlKey && e.shiftKey && e.key === "I") || 
        (e.ctrlKey && e.shiftKey && e.key === "C") || 
        (e.ctrlKey && e.key === "U")) {
        e.preventDefault();
        alert('Fitur Inspect Element Dikunci, Bang! 🦾');
    }
});
