/* ================================
   ZENOFAB — Main Script
   ================================ */

// ── Nav scroll state ──────────────────────────
const nav = document.getElementById('main-nav');
const onScroll = () => {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ── Scroll reveal (IntersectionObserver) ─────
const revealEls = document.querySelectorAll('.reveal-item');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = entry.target.parentElement.querySelectorAll('.reveal-item');
      let delay = 0;
      siblings.forEach((el, i) => {
        if (el === entry.target) delay = i * 60;
      });
      setTimeout(() => {
        entry.target.classList.add('in-view');
      }, delay);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

// ── Hamburger (mobile) ───────────────────────
const hamburger = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    if (navLinks) navLinks.style.display = isOpen ? 'flex' : '';
    if (navActions) navActions.style.display = isOpen ? 'flex' : '';
    if (navLinks) {
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '72px';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.background = 'rgba(13,14,16,0.97)';
      navLinks.style.backdropFilter = 'blur(20px)';
      navLinks.style.padding = '16px 24px 24px';
      navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.07)';
    }
  });
}

// ── Quote form handling ───────────────────────
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = quoteForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    btn.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/>
      </svg>
      Enquiry Sent!
    `;
    btn.style.background = '#2a7a4a';
    btn.style.color = '#fff';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      quoteForm.reset();
    }, 3200);
  });
}

// ── Spec finder form ─────────────────────────
const specForm = document.getElementById('spec-finder-form');
if (specForm) {
  specForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });
}

// ── Smooth active link highlight ─────────────
const sections = document.querySelectorAll('section[id], div[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        const href = link.getAttribute('href');
        if (href && href === `#${entry.target.id}`) {
          link.style.color = 'var(--accent)';
        }
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObs.observe(s));

// ── Video fallback ───────────────────────────
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
  heroVideo.addEventListener('error', () => {
    // If video fails, fade the wrap to a dark bg
    const wrap = heroVideo.closest('.hero-video-wrap');
    if (wrap) wrap.style.opacity = '0';
  });
}
