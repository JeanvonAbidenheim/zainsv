// =====================================================
//  theme.js — Cyberpunk Premium Interactions
//  Loader, Cursor, Canvas BG, Parallax, Mega Menu,
//  Stat Counter, Glitch, Scroll Progress, 3D Cards
// =====================================================

// =====================================================
//  1. LOADING SCREEN
// =====================================================
export function initLoader() {
  return new Promise(resolve => {
    const loader    = document.getElementById('loader');
    const bar       = document.getElementById('loaderBar');
    const lines     = document.querySelectorAll('.loader-line');
    if (!loader) { resolve(); return; }

    // Animate progress bar
    requestAnimationFrame(() => { bar.style.width = '100%'; });

    // Stagger lines
    lines.forEach((line, i) => {
      const delay = parseInt(line.dataset.delay) || i * 500;
      setTimeout(() => {
        line.classList.add('active');
        if (i > 0) lines[i - 1].classList.remove('active');
        if (i > 0) lines[i - 1].classList.add('done-line');
      }, delay);
    });

    // Dismiss after 2.6s
    setTimeout(() => {
      loader.classList.add('done');
      resolve();
    }, 2700);
  });
}

// =====================================================
//  2. CUSTOM CURSOR
// =====================================================
export function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animate() {
    // Dot follows exactly
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    // Ring lags behind (lerp)
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Hover state on interactive elements
  const hoverEls = 'a, button, .project-card, .cert-card, .contact-card, .filter-btn, .skill-card, .work-card, input, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverEls)) { ring.classList.add('hovered'); dot.style.background = '#8B5CF6'; }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverEls)) { ring.classList.remove('hovered'); dot.style.background = '#00D9FF'; }
  });

  // Click ripple
  document.addEventListener('mousedown', () => { ring.classList.add('clicked'); });
  document.addEventListener('mouseup',   () => { ring.classList.remove('clicked'); });

  // Click ripple burst
  document.addEventListener('click', e => {
    const r = document.createElement('div');
    Object.assign(r.style, {
      position: 'fixed', left: e.clientX + 'px', top: e.clientY + 'px',
      width: '4px', height: '4px', borderRadius: '50%',
      background: 'rgba(0,217,255,0.6)', pointerEvents: 'none', zIndex: 99997,
      transform: 'translate(-50%,-50%)', animation: 'ripple-burst 0.5s ease forwards',
    });
    document.body.appendChild(r);
    setTimeout(() => r.remove(), 500);
  });

  // Inject ripple keyframe
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-burst { to { transform: translate(-50%,-50%) scale(20); opacity: 0; } }`;
    document.head.appendChild(s);
  }
}

// =====================================================
//  3. BACKGROUND CANVAS — Particles + Connections
// =====================================================
export function initBgCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], mouse = { x: -999, y: -999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const COLORS = ['rgba(0,217,255,', 'rgba(139,92,246,', 'rgba(236,72,153,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(init = false) {
      this.x     = Math.random() * W;
      this.y     = init ? Math.random() * H : H + 10;
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = -Math.random() * 0.4 - 0.1;
      this.r     = Math.random() * 1.6 + 0.4;
      this.alpha = Math.random() * 0.45 + 0.05;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life  = 0;
      this.maxLife = Math.random() * 300 + 200;
    }
    update() {
      // Mouse repulsion
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.vx += (dx / dist) * force * 0.4;
        this.vy += (dy / dist) * force * 0.4;
      }
      // Dampen
      this.vx *= 0.98; this.vy *= 0.98;
      this.x += this.vx; this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) this.reset();
    }
    draw() {
      const fade = Math.min(this.life / 40, 1, (this.maxLife - this.life) / 40);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (this.alpha * fade) + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 90; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,217,255,${0.06 * (1 - d / 100)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  // Light streaks
  const streaks = Array.from({ length: 5 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    len: Math.random() * 120 + 60, angle: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.8 + 0.3, alpha: 0,
    maxAlpha: Math.random() * 0.12 + 0.04, phase: Math.random() * Math.PI * 2,
  }));

  function drawStreaks(t) {
    streaks.forEach(s => {
      s.alpha = s.maxAlpha * (0.5 + 0.5 * Math.sin(t * 0.0006 * s.speed + s.phase));
      if (s.alpha < 0.01) return;
      const ex = s.x + Math.cos(s.angle) * s.len;
      const ey = s.y + Math.sin(s.angle) * s.len;
      const grad = ctx.createLinearGradient(s.x, s.y, ex, ey);
      grad.addColorStop(0, `rgba(0,217,255,0)`);
      grad.addColorStop(0.5, `rgba(0,217,255,${s.alpha})`);
      grad.addColorStop(1, `rgba(139,92,246,0)`);
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = 1.2;
      ctx.stroke();
    });
  }

  let last = 0;
  function loop(t) {
    if (t - last < 16) { requestAnimationFrame(loop); return; } // ~60fps cap
    last = t;
    ctx.clearRect(0, 0, W, H);
    drawStreaks(t);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

// =====================================================
//  4. HERO PARALLAX on mouse move
// =====================================================
export function initHeroParallax() {
  const hero   = document.querySelector('.hero-container');
  const visual = document.querySelector('.hero-visual');
  if (!hero || !visual) return;
  let ticking = false;

  document.addEventListener('mousemove', e => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      visual.style.transform = `translate(${dx * 10}px, ${dy * 8}px)`;
      ticking = false;
    });
  });
}

// =====================================================
//  5. GLITCH on hero name — periodic
// =====================================================
export function initGlitch() {
  const name = document.getElementById('heroName');
  if (!name) return;
  setInterval(() => {
    name.classList.add('glitch');
    setTimeout(() => name.classList.remove('glitch'), 150);
  }, 4000 + Math.random() * 3000);
}

// =====================================================
//  6. MEGA MENU — desktop hover + mobile tap
// =====================================================
function initMegaMenu() {
  const items = document.querySelectorAll('.nav-item.has-mega');
  const isMobile = () => window.innerWidth <= 768;

  items.forEach(item => {
    item.querySelector('.nav-link').addEventListener('click', e => {
      if (!isMobile()) return;
      e.preventDefault();
      const was = item.classList.contains('mobile-open');
      items.forEach(i => i.classList.remove('mobile-open'));
      if (!was) item.classList.add('mobile-open');
    });
  });

  document.querySelectorAll('.mega-link, .mega-feature-link').forEach(l => {
    l.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('mobile-open'));
      document.getElementById('navLinks')?.classList.remove('open');
      document.getElementById('navBackdrop')?.classList.remove('open');
    });
  });
}

// =====================================================
//  7. MOBILE NAV TOGGLE
// =====================================================
function initMobileNav() {
  const toggle  = document.getElementById('navToggle');
  const links   = document.getElementById('navLinks');
  const backdrop = document.getElementById('navBackdrop');

  toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links?.classList.toggle('open');
    backdrop?.classList.toggle('open');
  });
  backdrop?.addEventListener('click', () => {
    toggle?.classList.remove('active');
    links?.classList.remove('open');
    backdrop?.classList.remove('open');
    document.querySelectorAll('.nav-item.has-mega').forEach(i => i.classList.remove('mobile-open'));
  });
}

// =====================================================
//  8. NAVBAR SCROLL BEHAVIOR
// =====================================================
function initNavbar() {
  const nav   = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link[href^="#"]:not([href="#"])');
  const btt   = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav?.classList.toggle('scrolled', y > 60);
    btt?.classList.toggle('visible', y > 400);

    // Active link
    links.forEach(link => {
      try {
        const sec = document.querySelector(link.getAttribute('href'));
        if (sec) {
          const top = sec.offsetTop - 120, h = sec.offsetHeight;
          link.classList.toggle('active', y >= top && y < top + h);
        }
      } catch (_) {}
    });
  });

  btt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.getElementById('footerYear').textContent = new Date().getFullYear();
}

// =====================================================
//  9. CV NAVBAR SYNC
// =====================================================
function initNavCvSync() {
  const navCv = document.getElementById('navCvBtn');
  const heroCv = document.getElementById('cvDownload');
  if (!navCv || !heroCv) return;
  const sync = () => { navCv.href = heroCv.href; navCv.target = '_blank'; };
  sync();
  new MutationObserver(sync).observe(heroCv, { attributes: true, attributeFilter: ['href'] });
}

// =====================================================
//  10. SCROLL REVEAL
// =====================================================
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

// =====================================================
//  11. SCROLL PROGRESS BAR
// =====================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  document.body.appendChild(bar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  });
}

// =====================================================
//  12. STAT COUNTER ANIMATION
// =====================================================
function animateCounter(el, target, dur = 1200) {
  const start = performance.now();
  const tick  = now => {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(target * e);
    if (p < 1) requestAnimationFrame(tick); else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

function initStatCounter() {
  const strip = document.querySelector('.stat-strip');
  if (!strip) return;
  let done = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      document.querySelectorAll('.stat-strip-num').forEach(el => {
        animateCounter(el, parseInt(el.dataset.target || el.textContent) || 0);
      });
    }
  }, { threshold: 0.3 }).observe(strip);
}

export function setStatStripValues({ projects = 0, certs = 0, skills = 0, exp = 0 }) {
  const map = { statNumProjects: projects, statNumCerts: certs, statNumSkills: skills, statNumExp: exp };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.dataset.target = val;
  });
}

// =====================================================
//  13. 3D TILT on project cards
// =====================================================
function init3DTilt() {
  document.addEventListener('mousemove', e => {
    document.querySelectorAll('.project-card.visible').forEach(card => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1.5) { card.style.transform = ''; return; }
      card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-4px)`;
    });
  });
  document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.project-card').forEach(c => c.style.transform = '');
  });
}

// =====================================================
//  INIT ALL
// =====================================================
export function initTheme() {
  initMegaMenu();
  initMobileNav();
  initNavbar();
  initNavCvSync();
  initReveal();
  initScrollProgress();
  initStatCounter();
  initBgCanvas();
  initHeroParallax();
  initGlitch();
  initCursor();
  setTimeout(init3DTilt, 2000); // after cards render
}
