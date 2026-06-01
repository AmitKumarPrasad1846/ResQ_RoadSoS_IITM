/* ═══════════════════════════════════════════════════════
   ResQ Services Page — Complete JavaScript
   Dark Mode WORKING | Hamburger Menu WORKING | Animations
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════
     1. DARK MODE TOGGLE (FULLY WORKING)
     ══════════════════════════════════════════════════════ */
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (darkModeToggle) {
    // Check saved preference on load
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
      console.log('Dark mode enabled from localStorage');
    }

    // Toggle on click
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.textContent = isDark ? '☀️' : '🌙';
      console.log('Dark mode toggled:', isDark);
    });
  } else {
    console.log('Dark mode toggle button not found!');
  }

  /* ═══════════════════════════════════════════════════════
     2. MOBILE HAMBURGER MENU (FULLY WORKING)
     ══════════════════════════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  function setupMobileMenu() {
    // Remove existing hamburger if any
    const existingHamburger = document.querySelector('.hamburger-menu');
    if (existingHamburger) {
      existingHamburger.remove();
    }

    // Only add hamburger on mobile devices
    if (window.innerWidth <= 768 && navbar && navLinks) {
      // Create hamburger button
      const hamburger = document.createElement('button');
      hamburger.className = 'hamburger-menu';
      hamburger.innerHTML = `<span></span><span></span><span></span>`;
      hamburger.setAttribute('aria-label', 'Menu');

      // Insert hamburger before nav-links
      navbar.insertBefore(hamburger, navLinks);

      // Toggle menu on hamburger click
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('mobile-active');
        console.log('Hamburger clicked, menu active:', navLinks.classList.contains('mobile-active'));
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navLinks.classList.contains('mobile-active')) {
          navLinks.classList.remove('mobile-active');
        }
      });

      // Close menu when clicking on a link
      const allLinks = document.querySelectorAll('.nav-links a');
      allLinks.forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('mobile-active');
        });
      });
    }
  }

  // Run on load
  setupMobileMenu();

  // Run on window resize
  window.addEventListener('resize', () => {
    setupMobileMenu();
    // Also close menu if it was open
    if (window.innerWidth > 768 && navLinks) {
      navLinks.classList.remove('mobile-active');
    }
  });

  /* ═══════════════════════════════════════════════════════
     3. NAVBAR SHRINK ON SCROLL
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
     4. SCROLL REVEAL ANIMATION
     ══════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll(
    '.service-card, .dashboard-glass-card, .hiw-step-card, .bfi-container, .cta-glass-card'
  );

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

  // Add reveal styles if not exist
  if (!document.querySelector('#reveal-style')) {
    const revealStyle = document.createElement('style');
    revealStyle.id = 'reveal-style';
    revealStyle.textContent = `
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1);
      }
      .reveal-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(revealStyle);
  }

  /* ═══════════════════════════════════════════════════════
     5. HERO ENTRANCE ANIMATION
     ══════════════════════════════════════════════════════ */
  const heroEls = [
    document.querySelector('.services-hero-badge'),
    document.querySelector('.services-hero-title'),
    document.querySelector('.services-hero-desc'),
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
     6. BUTTON ALERTS
     ══════════════════════════════════════════════════════ */
  const signinBtn = document.getElementById('signinBtn');
  if (signinBtn) {
    signinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Sign In feature coming soon.\n\nResQ is currently in pilot phase.');
    });
  }

  const dashboardBtn = document.getElementById('dashboardBtn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('ResQ Command Center Dashboard\n\nLive accident alerts, victim tracking, and dispatch system. Coming soon!');
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

  const waitlistBtn = document.getElementById('waitlistBtn');
  if (waitlistBtn) {
    waitlistBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Join Waitlist\n\nBe the first to know when ResQ launches in your city. Early access coming soon!');
    });
  }

  /* ═══════════════════════════════════════════════════════
     7. SCROLL TO TOP BUTTON
     ══════════════════════════════════════════════════════ */
  // Check if scroll button already exists
  let scrollTopBtn = document.querySelector('.scroll-top-btn');

  if (!scrollTopBtn) {
    scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
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
  }

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
     8. UPDATE SCROLL BUTTON COLOR FOR DARK MODE
     ══════════════════════════════════════════════════════ */
  function updateScrollBtnColor() {
    if (scrollTopBtn) {
      if (document.body.classList.contains('dark-mode')) {
        scrollTopBtn.style.background = '#ff6b6b';
      } else {
        scrollTopBtn.style.background = '#1075C7';
      }
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', updateScrollBtnColor);
  }
  updateScrollBtnColor();

  /* ═══════════════════════════════════════════════════════
     9. ACTIVE NAV LINK ON SCROLL
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
      const href = link.getAttribute('href');
      if (href && href.substring(1) === current) {
        link.parentElement.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ═══════════════════════════════════════════════════════
     10. SMOOTH SCROLL FOR ANCHOR LINKS
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
     11. CONSOLE LOG - Confirmation
     ══════════════════════════════════════════════════════ */
  console.log('✅ ResQ Services Page Loaded Successfully!');
  console.log('📱 Features: Dark Mode Working | Hamburger Menu Working | Scroll Reveal');
  console.log('🌙 Dark mode status:', document.body.classList.contains('dark-mode') ? 'ON' : 'OFF');
  console.log('📐 Window width:', window.innerWidth, '- Mobile menu:', window.innerWidth <= 768 ? 'active' : 'inactive');
});