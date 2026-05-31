// ═══════════════════════════════════════════
//   ResQ About Page — about.js
// ═══════════════════════════════════════════

// ── Active nav link on click ──
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Scroll-triggered entrance animations ──
const style = document.createElement('style');
style.textContent = '.reveal { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; } .reveal.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const animTargets = document.querySelectorAll(
  '.who-inner, .mv-card, .crisis-stat-card, .crisis-desc, .why-inner, .cta-heading, .cta-desc, .cta-buttons'
);

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach(function (el, i) {
  el.classList.add('reveal');
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  observer.observe(el);
});

// ── Hero entrance on load ──
window.addEventListener('load', function () {
  const heroEls = [
    document.querySelector('.about-hero-badge'),
    document.querySelector('.about-hero-title'),
    document.querySelector('.about-hero-desc'),
  ];
  heroEls.forEach(function (el, i) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (i * 0.15) + 's';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
});

// ── Navbar shrink on scroll ──
window.addEventListener('scroll', function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  if (window.scrollY > 60) {
    nav.style.height = '70px';
  } else {
    nav.style.height = '90px';
  }
}, { passive: true });