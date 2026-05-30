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