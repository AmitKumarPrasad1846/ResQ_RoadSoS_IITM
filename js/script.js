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

/* ─────────────────────────────────────────────
   ResQ About Page — script.js
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* 1. SCROLL REVEAL
  ─────────────────────────────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  /* Stagger children inside grid containers */
  document.querySelectorAll('.mv-grid, .stats-grid, .footer-top').forEach(grid => {
    [...grid.children].forEach((child, i) => {
      child.style.transitionDelay = (i * 0.13) + 's';
    });
  });


  /* 2. NAVBAR — shrink on scroll + active link highlight
  ─────────────────────────────────────────── */
  const navEl = document.querySelector('nav');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navEl.style.padding = '10px 40px';
    } else {
      navEl.style.padding = '18px 40px';
    }
  }, { passive: true });

  /* Highlight nav link for current section */
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(sec => sectionObserver.observe(sec));


  /* 3. SMOOTH ANCHOR SCROLL
  ─────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90; // nav height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  /* 4. STAT COUNTER ANIMATION
  ─────────────────────────────────────────── */
  function animateCounter(el, target, duration = 1800) {
    const isPercent  = target.includes('%');
    const isComma    = target.includes(',');
    const rawNum     = parseFloat(target.replace(/[^0-9.]/g, ''));
    const start      = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current  = Math.floor(eased * rawNum);

      if (isComma) {
        el.textContent = current.toLocaleString('en-IN');
      } else if (isPercent) {
        el.textContent = current + '%';
      } else {
        el.textContent = current;
      }

      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target; // ensure exact final value
    }

    requestAnimationFrame(step);
  }

  const statPills = document.querySelectorAll('.stat-pill');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = el.dataset.target;
        animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statPills.forEach(pill => statObserver.observe(pill));


  /* 5. BUTTON RIPPLE EFFECT
  ─────────────────────────────────────────── */
  document.querySelectorAll('.btn-primary, .btn-cta-primary, .btn-cta-outline').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const rect   = this.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height);

      circle.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        left: ${e.clientX - rect.left - size / 2}px;
        top:  ${e.clientY - rect.top  - size / 2}px;
        background: rgba(255,255,255,.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple .55s ease-out forwards;
        pointer-events: none;
      `;

      /* make btn relative if not already */
      const pos = getComputedStyle(this).position;
      if (pos === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';

      this.appendChild(circle);
      circle.addEventListener('animationend', () => circle.remove());
    });
  });

  /* Inject ripple keyframe once */
  if (!document.getElementById('ripple-style')) {
    const style = document.createElement('style');
    style.id = 'ripple-style';
    style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
    document.head.appendChild(style);
  }

});