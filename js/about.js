/* ═══════════════════════════════════════════════════════
   ResQ About Page — Complete JavaScript
   Dark Mode | Mobile Menu | Smooth Scroll | Animations
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
    if (existingHamburger) {
      existingHamburger.remove();
    }

    if (window.innerWidth <= 768 && navbar && navLinks) {
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-menu';
      hamburger.innerHTML = `<span></span><span></span><span></span>`;

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

      const allLinks = document.querySelectorAll('.nav-links a');
      allLinks.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-active');
        });
      });
    }
  }

  setupMobileMenu();
  window.addEventListener('resize', setupMobileMenu);

  /* ═══════════════════════════════════════════════════════
     3. ACTIVE NAV LINK ON SCROLL
     ══════════════════════════════════════════════════════ */
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links li a');

  function updateActiveLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(link => {
      link.parentElement.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.parentElement.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ═══════════════════════════════════════════════════════
     4. NAVBAR SHRINK ON SCROLL
     ══════════════════════════════════════════════════════ */
  const navbarEl = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbarEl.style.padding = '8px 20px';
    } else {
      navbarEl.style.padding = '10px 24px';
    }
  });

  /* ═══════════════════════════════════════════════════════
     5. SCROLL REVEAL ANIMATION
     ══════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll(
    '.who-inner, .mv-card, .crisis-stat-card, .why-inner, .about-cta'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 0.1 + 's';
    revealObserver.observe(el);
  });

  /* ═══════════════════════════════════════════════════════
     6. HERO ENTRANCE ANIMATION
     ══════════════════════════════════════════════════════ */
  const heroEls = [
    document.querySelector('.about-hero-badge'),
    document.querySelector('.about-hero-title'),
    document.querySelector('.about-hero-desc'),
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
     7. STAT COUNTER ANIMATION
     ══════════════════════════════════════════════════════ */
  function animateCounter(element, targetValue, suffix = '') {
    let start = 0;
    const duration = 2000;
    const increment = targetValue / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < targetValue) {
        if (suffix === '%') {
          element.textContent = Math.floor(start) + suffix;
        } else {
          element.textContent = Math.floor(start).toLocaleString('en-IN');
        }
        requestAnimationFrame(updateCounter);
      } else {
        if (suffix === '%') {
          element.textContent = targetValue + suffix;
        } else {
          element.textContent = targetValue.toLocaleString('en-IN');
        }
      }
    }
    updateCounter();
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;

        if (text.includes('%')) {
          const targetNum = parseInt(text);
          element.textContent = '0%';
          animateCounter(element, targetNum, '%');
        } else {
          const targetNum = parseInt(text.replace(/,/g, ''));
          element.textContent = '0';
          animateCounter(element, targetNum, '');
        }
        statObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.crisis-pill').forEach(el => {
    statObserver.observe(el);
  });

  /* ═══════════════════════════════════════════════════════
     8. SMOOTH SCROLL FOR ANCHOR LINKS
     ══════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  /* ═══════════════════════════════════════════════════════
     9. BUTTON ALERTS
     ══════════════════════════════════════════════════════ */
  const signinBtn = document.getElementById('signinBtn');
  if (signinBtn) {
    signinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Sign In feature coming soon.\n\nResQ is currently in pilot phase.');
    });
  }

  const getResqBtn = document.getElementById('getResqBtn');
  if (getResqBtn) {
    getResqBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Get ResQ\n\nResQ is launching soon in your city. Stay tuned for early access!');
    });
  }

  const partnerBtn = document.getElementById('partnerBtn');
  if (partnerBtn) {
    partnerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Partner with ResQ\n\nJoin us in making Indian roads safer. Contact: partners@resq.com');
    });
  }

  const demoBtn = document.getElementById('demoBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Request Demo\n\nSchedule a demo of ResQ\'s emergency response system. Coming soon!');
    });
  }

  /* ═══════════════════════════════════════════════════════
     10. SCROLL TO TOP BUTTON
     ══════════════════════════════════════════════════════ */
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 45px;
    height: 45px;
    background: #1075C7;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 22px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.visibility = 'visible';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.visibility = 'hidden';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ═══════════════════════════════════════════════════════
     11. CONSOLE LOG
     ══════════════════════════════════════════════════════ */
  console.log('ResQ About Page Loaded ✅');
  console.log('Features: Dark Mode | Mobile Menu | Counter Animation | Scroll Reveal');
});