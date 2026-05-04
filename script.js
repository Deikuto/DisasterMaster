// Initialize Scroll Animations (AOS)
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({ 
        duration: 1000, 
        once: true // Animations happen only once when scrolling down
    });
});

// Language Switcher Logic
function setLanguage(lang) {
    // 1. Update active button styling for English
    const btnEn = document.getElementById('btn-en');
    btnEn.classList.toggle('active', lang === 'en');
    btnEn.classList.toggle('text-gray-400', lang !== 'en');
    
    // 2. Update active button styling for Bulgarian
    const btnBg = document.getElementById('btn-bg');
    btnBg.classList.toggle('active', lang === 'bg');
    btnBg.classList.toggle('text-gray-400', lang !== 'bg');

    // 3. Swap text content based on the data attributes in HTML
    const elements = document.querySelectorAll('.translate-text');
    elements.forEach(el => {
        if (lang === 'bg') {
            el.textContent = el.getAttribute('data-bg');
        } else {
            el.textContent = el.getAttribute('data-en');
        }
    });

    // 4. Update the HTML lang attribute for Search Engine Optimization (SEO)
    document.documentElement.lang = lang;
}