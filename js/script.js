/* ═══════════════════════════════════════════════════════
   ResQ Home Page — Complete JavaScript
   Smooth Scroll | Animations | Counters | Mobile Menu
════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ═══════════════════════════════════════════════════════
     1. MOBILE HAMBURGER MENU
     ══════════════════════════════════════════════════════ */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.createElement('button');

  // Only add hamburger on mobile
  if (window.innerWidth <= 768) {
    hamburger.className = 'hamburger-menu';
    hamburger.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    // Insert hamburger before nav-links
    const navbarWrapper = document.querySelector('.navbar');
    if (navbarWrapper && !document.querySelector('.hamburger-menu')) {
      navbarWrapper.insertBefore(hamburger, navLinks);
    }

    // Toggle menu on click
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-active');
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

  /* ═══════════════════════════════════════════════════════
     2. SCROLL REVEAL ANIMATION
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
     3. NAVBAR SHRINK ON SCROLL + ACTIVE LINK
     ══════════════════════════════════════════════════════ */
  const navbarEl = document.querySelector('.navbar');
  const navLinksEl = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');

  // Shrink navbar on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbarEl.style.padding = '8px 20px';
    } else {
      navbarEl.style.padding = '10px 24px';
    }
  });

  // Active link highlight on scroll
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

    navLinksEl.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  /* ═══════════════════════════════════════════════════════
     4. SMOOTH SCROLL FOR ANCHOR LINKS
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

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });

  /* ═══════════════════════════════════════════════════════
     5. SCROLL BUTTON (Hero Section)
     ══════════════════════════════════════════════════════ */
  const scrollBtn = document.getElementById('scrollBtn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      const problemSection = document.getElementById('problem');
      if (problemSection) {
        const offset = 80;
        const targetPosition = problemSection.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     6. STAT COUNTER ANIMATION
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
     7. FAQ ACCORDION
     ══════════════════════════════════════════════════════ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          otherItem.classList.remove('open');
          const otherButton = otherItem.querySelector('.faq-question');
          if (otherButton) {
            otherButton.setAttribute('aria-expanded', 'false');
          }
        }
      });

      item.classList.toggle('open');
      const isExpanded = item.classList.contains('open');
      question.setAttribute('aria-expanded', isExpanded);
    });
  });

  /* ═══════════════════════════════════════════════════════
     8. BUTTON RIPPLE EFFECT
     ══════════════════════════════════════════════════════ */
  const rippleButtons = document.querySelectorAll('.btn-primary, .btn-outline, .btn-partner, .btn-newsletter, .btn-signin');

  rippleButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.style.position = 'relative';
      this.style.overflow = 'hidden';

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `
    .ripple-effect {
      position: absolute;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(rippleStyle);

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  /* ═══════════════════════════════════════════════════════
     11. RESIZE HANDLER (For mobile menu on orientation change)
     ══════════════════════════════════════════════════════ */
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (navLinks) {
        navLinks.classList.remove('mobile-active');
      }
      const existingHamburger = document.querySelector('.hamburger-menu');
      if (existingHamburger) {
        existingHamburger.remove();
      }
    } else {
      if (!document.querySelector('.hamburger-menu') && navbar && navLinks) {
        const newHamburger = document.createElement('button');
        newHamburger.className = 'hamburger-menu';
        newHamburger.innerHTML = `<span></span><span></span><span></span>`;
        navbar.insertBefore(newHamburger, navLinks);

        newHamburger.addEventListener('click', () => {
          navLinks.classList.toggle('mobile-active');
        });
      }
    }
  });

  /* ═══════════════════════════════════════════════════════
     12. CONSOLE LOG
     ══════════════════════════════════════════════════════ */
  console.log('ResQ Website Loaded ✅');
  console.log('Features: Mobile Menu | Smooth Scroll | Counter Animation | FAQ Accordion');

});