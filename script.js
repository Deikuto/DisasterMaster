/* ===========================
   DISASTER MASTER — script.js
   =========================== */

// ── Scroll-aware nav ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// ── Intersection Observer for stat cards ─────────────────────
// Re-trigger count animation when the stats section enters view
const statCards = document.querySelectorAll('.stat-card');
const observer  = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.2 });

statCards.forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});


// ── Language switcher ─────────────────────────────────────────
function setLanguage(lang) {
    // Update button styling
    ['en', 'bg'].forEach(l => {
        const btn = document.getElementById('btn-' + l);
        btn.classList.toggle('active', l === lang);
    });

    // Swap all translatable text
    document.querySelectorAll('.translate-text').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text) el.textContent = text;
    });

    // Update lang attribute for SEO / screen readers
    document.documentElement.lang = lang;

    // Persist preference
    localStorage.setItem('dm-lang', lang);
}

// Apply saved or browser language on load
(function () {
    const saved    = localStorage.getItem('dm-lang');
    const browser  = navigator.language.startsWith('bg') ? 'bg' : 'en';
    setLanguage(saved || browser);
})();


// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});