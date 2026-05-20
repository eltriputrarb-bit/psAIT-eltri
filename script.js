function toggleMenu() {
    const menuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    // Ini yang bikin garis jadi X dan menu muncul
    menuBtn.classList.toggle('is-active'); 
    navLinks.classList.toggle('active');
}