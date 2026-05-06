document.addEventListener('DOMContentLoaded', function () {

  /* ── Year ──────────────────────────────────── */
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Smooth scroll ──────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const mn = document.getElementById('mobile-nav');
        if (mn) mn.classList.remove('open');
      }
    });
  });

  /* ── Mobile menu ────────────────────────────── */
  const btn = document.getElementById('menu-btn');
  const mn  = document.getElementById('mobile-nav');
  if (btn && mn) {
    btn.addEventListener('click', () => {
      const open = mn.classList.toggle('open');
      mn.setAttribute('aria-hidden', String(!open));
    });
  }

  /* ── Scroll reveal ──────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -48px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ── Active nav on scroll ───────────────────── */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');
  const hdrHeight = (document.getElementById('site-header') || {}).offsetHeight || 60;

  function setActive() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - hdrHeight - 90) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
});