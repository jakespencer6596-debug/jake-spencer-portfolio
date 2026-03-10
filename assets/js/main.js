// ========================================
// Jake Spencer Portfolio - V2
// ========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
    navLinks.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => navLinks.classList.remove('active'))
    );
  }

  // ---- Cursor glow ----
  const glow = document.getElementById('cursorGlow');
  if (glow && window.innerWidth > 768) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    (function render() {
      cx += (mx - cx) * 0.08;
      cy += (my - cy) * 0.08;
      glow.style.left = cx + 'px';
      glow.style.top = cy + 'px';
      requestAnimationFrame(render);
    })();
  }

  // ---- Scroll reveal ----
  const revealEls = document.querySelectorAll(
    '.section-tag, .about-heading, .about-right, .stat-item, .bento-card, ' +
    '.section-header-row, .project-card, .timeline-item, .partners-row, ' +
    '.connect-card, .contact-heading, .contact-details, .contact-form, ' +
    '.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-photo-wrapper'
  );

  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('.reveal:not(.visible)');
        const idx = [...siblings].indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // Make hero elements visible immediately with stagger
  const heroEls = document.querySelectorAll('.hero .reveal');
  heroEls.forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });

  // ---- Contact form ----
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const origHTML = btn.innerHTML;
      btn.innerHTML = '<span>Sent!</span>';
      btn.style.background = 'linear-gradient(135deg, var(--sunset-orange), var(--sunset-amber))';
      setTimeout(() => {
        btn.innerHTML = origHTML;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ---- Smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
