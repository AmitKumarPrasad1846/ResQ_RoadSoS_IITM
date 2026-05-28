// ─────────────────────────────────────────
//   ResQ Landing Page — script.js
// ─────────────────────────────────────────

// this code is developed by chandrashekhar and amit 

// ── Smooth scroll-down button ──
const scrollBtn = document.getElementById('scrollBtn');

if (scrollBtn) {
  scrollBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  });
}

// ── Active nav link highlight on click ──
const navItems = document.querySelectorAll('.nav-links li');

navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(function (el) {
      el.classList.remove('active');
    });
    item.classList.add('active');
  });
});

// ── Subtle entrance animation on page load ──
window.addEventListener('load', function () {
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc  = document.querySelector('.hero-desc');
  const heroButtons = document.querySelector('.hero-buttons');

  [heroTitle, heroDesc, heroButtons].forEach(function (el, i) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    el.style.transitionDelay = (i * 0.15) + 's';

    // Trigger after a tiny delay so browser picks up the initial state
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });
});