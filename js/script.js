/* ═══════════════════════════════════════════════════════
   ResQ Home Page — Complete JavaScript
   Dark Mode | Mobile Menu | Smooth Scroll | Animations
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════
     1. DARK MODE TOGGLE
     ══════════════════════════════════════════════════════ */
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (darkModeToggle) {
    // Check saved preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }

    // Toggle on click
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
     3. SCROLL REVEAL ANIMATION
     ══════════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll('.feature-card, .step-item, .team-card, .stat-pill, .contact-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
    revealObserver.observe(el);
  });

  const style = document.createElement('style');
  style.textContent = `
    .reveal-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);

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
     5. SMOOTH SCROLL FOR ANCHOR LINKS
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
        history.pushState(null, null, targetId);
      }
    });
  });

  /* ═══════════════════════════════════════════════════════
     6. SCROLL BUTTON (Hero Section)
     ══════════════════════════════════════════════════════ */
  const scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const problemSection = document.getElementById('problem');
      if (problemSection) {
        const offset = 80;
        const targetPosition = problemSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  }

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
        element.textContent = Math.floor(start) + suffix;
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = targetValue + suffix;
      }
    }
    updateCounter();
  }

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const text = element.textContent;
        const match = text.match(/(\d+)(\+?)/);
        if (match) {
          const targetNum = parseInt(match[1]);
          const suffix = match[2] || '';
          element.textContent = '0' + suffix;
          animateCounter(element, targetNum, suffix);
        }
        statObserver.unobserve(element);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num, .f-stat-num, .pill-num').forEach(el => {
    statObserver.observe(el);
  });

  /* ═══════════════════════════════════════════════════════
     8. FAQ ACCORDION
     ══════════════════════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
        }
      });
      item.classList.toggle('open');
    });
  });

  /* ═══════════════════════════════════════════════════════
     9. BUTTON ALERTS
     ══════════════════════════════════════════════════════ */
 

  const partnerBtn = document.getElementById('partnerBtn');
  if (partnerBtn) {
    partnerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Partner with ResQ\n\nJoin us in making Indian roads safer.');
    });
  }

  const newsletterBtn = document.getElementById('newsletterBtn');
  if (newsletterBtn) {
    newsletterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Join Newsletter\n\nStay updated with ResQ news and launches.');
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
  console.log('ResQ Website Loaded ✅');
  console.log('Features: Dark Mode | Mobile Menu | Smooth Scroll | Counter Animation');
});