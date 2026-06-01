/* ═══════════════════════════════════════════════════════
   ResQ Contact Page — Complete JavaScript
   Dark Mode Working | Hamburger Menu | Form Validation
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════
     1. DARK MODE TOGGLE
     ══════════════════════════════════════════════════════ */
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (darkModeToggle) {
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }

    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
    });
  }

  /* ═══════════════════════════════════════════════════════
     2. MOBILE HAMBURGER MENU
     ══════════════════════════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  function setupMobileMenu() {
    const existingHamburger = document.querySelector('.hamburger-menu');
    if (existingHamburger) existingHamburger.remove();

    if (window.innerWidth <= 768 && navbar && navLinks) {
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-menu';
      hamburger.innerHTML = '<span></span><span></span><span></span>';

      navbar.insertBefore(hamburger, navLinks);

      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-active');
      });

      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('mobile-active')) {
          navLinks.classList.remove('mobile-active');
        }
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('mobile-active'));
      });
    }
  }

  setupMobileMenu();
  window.addEventListener('resize', setupMobileMenu);

  /* ═══════════════════════════════════════════════════════
     3. NAVBAR SHRINK ON SCROLL
     ══════════════════════════════════════════════════════ */
  const navbarEl = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbarEl.style.padding = window.scrollY > 50 ? '8px 20px' : '10px 24px';
  });

  /* ═══════════════════════════════════════════════════════
     4. SCROLL REVEAL ANIMATION
     ══════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.contact-info-card, .map-glass-card, .form-glass-card, .cta-glass-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    revealObserver.observe(el);
  });

  const revealStyle = document.createElement('style');
  revealStyle.textContent = `
    .reveal { opacity: 0; transform: translateY(30px); transition: all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1); }
    .reveal-visible { opacity: 1 !important; transform: translateY(0) !important; }
  `;
  document.head.appendChild(revealStyle);

  /* ═══════════════════════════════════════════════════════
     5. HERO ENTRANCE ANIMATION
     ══════════════════════════════════════════════════════ */
  const heroEls = [
    document.querySelector('.contact-hero-badge'),
    document.querySelector('.contact-hero-title'),
    document.querySelector('.contact-hero-desc'),
  ];

  heroEls.forEach((el, i) => {
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      el.style.transitionDelay = (i * 0.15) + 's';
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100);
    }
  });

  /* ═══════════════════════════════════════════════════════
     6. FORM VALIDATION
     ══════════════════════════════════════════════════════ */
  const sendBtn = document.getElementById('sendBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const fields = ['fullName', 'email', 'phone', 'subject', 'message'];
      let isValid = true;

      fields.forEach(field => {
        const input = document.getElementById(field);
        if (input && !input.value.trim()) {
          input.style.borderColor = '#ff6b6b';
          isValid = false;
        } else if (input) {
          input.style.borderColor = 'transparent';
        }
      });

      const email = document.getElementById('email');
      if (email && email.value.trim() && !email.value.includes('@')) {
        email.style.borderColor = '#ff6b6b';
        isValid = false;
      }

      if (isValid) {
        sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> Sent!';
        sendBtn.style.background = '#1a7a40';
        sendBtn.disabled = true;

        setTimeout(() => {
          fields.forEach(field => {
            const input = document.getElementById(field);
            if (input) input.value = '';
          });
          sendBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> Send Message';
          sendBtn.style.background = '';
          sendBtn.disabled = false;
        }, 3000);

        alert('Thank you! We will get back to you soon.');
      } else {
        alert('Please fill all required fields correctly.');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     7. BUTTON ALERTS
     ══════════════════════════════════════════════════════ */
  document.getElementById('signinBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Sign In feature coming soon.');
  });

  document.getElementById('demoBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Request Demo\n\nSchedule a demo of ResQ\'s emergency response system.');
  });

  /* ═══════════════════════════════════════════════════════
     8. SCROLL TO TOP BUTTON
     ══════════════════════════════════════════════════════ */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed; bottom: 30px; right: 30px; width: 45px; height: 45px;
    background: #1075C7; color: white; border: none; border-radius: 50%;
    font-size: 22px; cursor: pointer; opacity: 0; visibility: hidden;
    transition: all 0.3s ease; z-index: 999; box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  `;
  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    const show = window.scrollY > 500;
    scrollTopBtn.style.opacity = show ? '1' : '0';
    scrollTopBtn.style.visibility = show ? 'visible' : 'hidden';
  });

  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ═══════════════════════════════════════════════════════
     9. UPDATE SCROLL BUTTON COLOR FOR DARK MODE
     ══════════════════════════════════════════════════════ */
  const updateScrollBtnColor = () => {
    scrollTopBtn.style.background = document.body.classList.contains('dark-mode') ? '#ff6b6b' : '#1075C7';
  };

  darkModeToggle?.addEventListener('click', updateScrollBtnColor);
  updateScrollBtnColor();

  console.log('✅ ResQ Contact Page Loaded | Dark Mode | Hamburger | Form Validation | Map');
});