// ═══════════════════════════════════════════
//   ResQ Home Page — script.js
// ═══════════════════════════════════════════

// ── Scroll down button ──
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', function () {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
}

// ── Active nav link on click ──
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.parentElement.classList.add('active');
    }
  });
});

// ── FAQ Accordion ──
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function (item) {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', function () {
    const isOpen = item.classList.contains('open');
    // Close all
    faqItems.forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Entrance animations on scroll ──
const animTargets = document.querySelectorAll(
  '.feature-card, .step-item, .team-card, .faq-item, .hero-stats, .stat-pill, .steps-box, .contact-card'
);

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach(function (el, i) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.style.transitionDelay = (i % 6) * 0.08 + 's';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.visible, [style*="opacity"]').forEach(el => {
    if (!el.classList.contains('visible')) return;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// visible class triggers animation
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ── Hero elements entrance on load ──
window.addEventListener('load', function () {
  const heroEls = [
    document.querySelector('.hero-badge'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-buttons'),
    document.querySelector('.scroll-hint'),
    document.querySelector('.hero-stats'),
  ];
  heroEls.forEach(function (el, i) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (i * 0.12) + 's';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
});// ═══════════════════════════════════════════
//   ResQ Home Page — script.js
// ═══════════════════════════════════════════

// ── Scroll down button ──
const scrollBtn = document.getElementById('scrollBtn');
if (scrollBtn) {
  scrollBtn.addEventListener('click', function () {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  });
}

// ── Active nav link on click ──
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', function () {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.parentElement.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.parentElement.classList.add('active');
    }
  });
});

// ── FAQ Accordion ──
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function (item) {
  const btn = item.querySelector('.faq-question');
  btn.addEventListener('click', function () {
    const isOpen = item.classList.contains('open');
    // Close all
    faqItems.forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Entrance animations on scroll ──
const animTargets = document.querySelectorAll(
  '.feature-card, .step-item, .team-card, .faq-item, .hero-stats, .stat-pill, .steps-box, .contact-card'
);

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

animTargets.forEach(function (el, i) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.style.transitionDelay = (i % 6) * 0.08 + 's';
  observer.observe(el);
});

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.visible, [style*="opacity"]').forEach(el => {
    if (!el.classList.contains('visible')) return;
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});

// visible class triggers animation
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

// ── Hero elements entrance on load ──
window.addEventListener('load', function () {
  const heroEls = [
    document.querySelector('.hero-badge'),
    document.querySelector('.hero-title'),
    document.querySelector('.hero-desc'),
    document.querySelector('.hero-buttons'),
    document.querySelector('.scroll-hint'),
    document.querySelector('.hero-stats'),
  ];
  heroEls.forEach(function (el, i) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (i * 0.12) + 's';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }));
  });
});
// ═══════════════════════════════════════════
//   ResQ Services Page — services.js
// ═══════════════════════════════════════════

// ── Active nav on click ──
const navItems = document.querySelectorAll('.nav-links li');
navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(el => el.classList.remove('active'));
    item.classList.add('active');
  });
});

// ── Scroll-triggered entrance animations ──
const animTargets = document.querySelectorAll(
  '.product-card, .hiw-card, .dashboard-card, .bfi-content, .bfi-image, .cta-card'
);

const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach(function (el, i) {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.style.transitionDelay = (i % 5) * 0.1 + 's';
  observer.observe(el);
});

// ── Hero entrance on load ──
window.addEventListener('load', function () {
  const heroEls = [
    document.querySelector('.s-hero-badge'),
    document.querySelector('.s-hero-title'),
    document.querySelector('.s-hero-desc'),
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