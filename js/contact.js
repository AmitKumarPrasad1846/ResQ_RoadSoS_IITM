// ═══════════════════════════════════════════
//   ResQ Contact Page — contact.js
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
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);

const animTargets = document.querySelectorAll(
  '.info-card, .form-card, .demo-section'
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
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  el.style.transitionDelay = (i % 4) * 0.1 + 's';
  observer.observe(el);
});

// ── Hero entrance on load ──
window.addEventListener('load', function () {
  const heroEls = [
    document.querySelector('.c-hero-badge'),
    document.querySelector('.c-hero-title'),
    document.querySelector('.c-hero-desc'),
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

// ── Form submit handler ──
const sendBtn = document.querySelector('.btn-send');
if (sendBtn) {
  sendBtn.addEventListener('click', function () {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');
    let valid = true;
    inputs.forEach(function (inp) {
      if (!inp.value.trim()) {
        inp.style.borderColor = '#ff6b6b';
        valid = false;
      } else {
        inp.style.borderColor = 'transparent';
      }
    });
    if (valid) {
      sendBtn.textContent = 'Message Sent ✓';
      sendBtn.style.background = '#1a7a40';
      setTimeout(() => {
        sendBtn.innerHTML = '<img src="assets/send_messages.png" alt="" class="send-icon" style="width:20px;height:20px;object-fit:contain;filter:brightness(0) invert(1);"> Send message';
        sendBtn.style.background = '#1a1a2e';
        inputs.forEach(inp => inp.value = '');
      }, 3000);
    }
  });
}