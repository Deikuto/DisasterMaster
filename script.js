/* ═══════════════════════════════════════
   DISASTER MASTER — script.js (full)
   ═══════════════════════════════════════ */

// ── Custom cursor ──────────────────────────────────────────────
const cursor = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
}, { passive: true });


// ── Nav scroll state ──────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


// ── Mobile menu ───────────────────────────────────────────────
const mobileBtn = document.getElementById('mobileBtn');
const mobileNav = document.getElementById('mobileNav');
mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});
// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobileNav.classList.remove('open'));
});


// ── Particles ─────────────────────────────────────────────────
(function buildParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    const count = 22;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.cssText = `
            left: ${Math.random() * 100}%;
            --dur: ${6 + Math.random() * 10}s;
            --delay: ${-Math.random() * 10}s;
            --dx: ${(Math.random() - .5) * 120}px;
        `;
        container.appendChild(p);
    }
})();


// ── Stat card scroll reveal ───────────────────────────────────
(function initStatObserver() {
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, i) => {
        card.style.setProperty('--d', (i * 0.15) + 's');
    });

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach(c => obs.observe(c));
})();


// ── Smooth scroll for nav anchors ─────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});


// ── Language switcher ─────────────────────────────────────────
function setLanguage(lang) {
    // Buttons
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-bg').classList.toggle('active', lang === 'bg');

    // All translatable elements — class "t" or "translate-text"
    document.querySelectorAll('.t, .translate-text').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text !== null) el.innerHTML = text; // innerHTML to preserve &ldquo; etc.
    });

    document.documentElement.lang = lang;
    try { localStorage.setItem('dm-lang', lang); } catch(e){}
}

// Init language
(function initLang() {
    let saved;
    try { saved = localStorage.getItem('dm-lang'); } catch(e) {}
    const browser = navigator.language && navigator.language.startsWith('bg') ? 'bg' : 'en';
    setLanguage(saved || browser);
})();


// ── Active nav link highlight on scroll ───────────────────────
(function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const links    = document.querySelectorAll('.nav-links a[href^="#"]');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                links.forEach(l => {
                    l.style.color = l.getAttribute('href') === '#' + id
                        ? 'var(--orange)'
                        : '';
                });
            }
        });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => obs.observe(s));
})();