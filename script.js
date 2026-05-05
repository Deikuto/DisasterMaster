/* ═══════════════════════════════════════
   DISASTER MASTER — script.js
   ═══════════════════════════════════════ */

// ── AAA Cursor Glow Tracking (Smooth interpolation loop) ──
const glow = document.querySelector('.cursor-glow');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let glowX = mouseX;
let glowY = mouseY;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}, { passive: true });

function updateCursorGlow() {
    glowX += (mouseX - glowX) * 0.12; 
    glowY += (mouseY - glowY) * 0.12;
    
    if(glow) {
        glow.style.transform = `translate3d(calc(${glowX}px - 50%), calc(${glowY}px - 50%), 0)`;
    }
    requestAnimationFrame(updateCursorGlow);
}
updateCursorGlow();

// ── AAA Card Hover Lighting Effects ───────────────────────────
document.querySelectorAll('.aaa-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
});

// ── Subtle Hero Parallax Key Art ─────────────────────────────
const heroBg = document.getElementById('parallax-bg');
document.addEventListener('mousemove', e => {
    if(!heroBg) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 20; 
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    heroBg.style.transform = `translate3d(${x}px, ${y}px, 0)`;
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

// ── Animated Donut Charts ─────────────────────────────────────
(function initDonutCharts() {
    const donuts = document.querySelectorAll('.donut-fill');
    
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const targetVal = e.target.getAttribute('data-target');
                // Animate stroke dasharray to "fill" the pie chart
                e.target.style.strokeDasharray = `${targetVal}, 100`;
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });

    donuts.forEach(d => obs.observe(d));
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
    document.getElementById('btn-en').classList.toggle('active', lang === 'en');
    document.getElementById('btn-bg').classList.toggle('active', lang === 'bg');

    document.querySelectorAll('.t, .translate-text').forEach(el => {
        const text = el.getAttribute('data-' + lang);
        if (text !== null) el.innerHTML = text;
    });

    document.documentElement.lang = lang;
    try { localStorage.setItem('dm-lang', lang); } catch(e){}
}

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