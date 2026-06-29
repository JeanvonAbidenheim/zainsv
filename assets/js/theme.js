// ============================================
//  theme.js — Navigasi & Interaksi UI
//  Mega Menu, Mobile Nav, Stat Counter, Scroll Progress
// ============================================

// ---- Mega Menu (desktop hover + mobile tap) ----
function initMegaMenu() {
  const megaItems = document.querySelectorAll(".nav-item.has-mega");
  const isMobile = () => window.innerWidth <= 768;

  megaItems.forEach(item => {
    const link = item.querySelector(".nav-link");
    link.addEventListener("click", (e) => {
      if (isMobile()) {
        e.preventDefault();
        const wasOpen = item.classList.contains("mobile-open");
        megaItems.forEach(i => i.classList.remove("mobile-open"));
        if (!wasOpen) item.classList.add("mobile-open");
      }
    });
  });

  document.querySelectorAll(".mega-link, .mega-feature-link").forEach(link => {
    link.addEventListener("click", () => {
      megaItems.forEach(i => i.classList.remove("mobile-open"));
      document.getElementById("navLinks")?.classList.remove("open");
      document.getElementById("navBackdrop")?.classList.remove("open");
    });
  });
}

// ---- Mobile Nav Toggle + Backdrop ----
function initMobileNav() {
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const backdrop = document.getElementById("navBackdrop");

  toggle?.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks?.classList.toggle("open");
    backdrop?.classList.toggle("open");
  });

  backdrop?.addEventListener("click", () => {
    toggle?.classList.remove("active");
    navLinks?.classList.remove("open");
    backdrop?.classList.remove("open");
    document.querySelectorAll(".nav-item.has-mega").forEach(i => i.classList.remove("mobile-open"));
  });
}

// ---- Sync navbar CV button with hero CV link ----
function initNavCvSync() {
  const navCv = document.getElementById("navCvBtn");
  const heroCv = document.getElementById("cvDownload");
  if (!navCv || !heroCv) return;
  const sync = () => { navCv.href = heroCv.href; navCv.target = "_blank"; };
  sync();
  const observer = new MutationObserver(sync);
  observer.observe(heroCv, { attributes: true, attributeFilter: ["href"] });
}

// ---- Stat Strip Counter — animated number count-up ----
function animateCounter(el, target, duration = 1100) {
  if (!el) return;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

function initStatStripCounters() {
  const strip = document.querySelector(".stat-strip");
  if (!strip) return;
  let triggered = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !triggered) {
        triggered = true;
        document.querySelectorAll(".stat-strip-num").forEach(el => {
          const target = parseInt(el.dataset.target || el.textContent) || 0;
          animateCounter(el, target);
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  io.observe(strip);
}

// Called by app.js after Firestore/demo data has loaded
export function setStatStripValues({ projects = 0, certs = 0, skills = 0, exp = 0 }) {
  const map = {
    statNumProjects: projects,
    statNumCerts: certs,
    statNumSkills: skills,
    statNumExp: exp,
  };
  Object.entries(map).forEach(([id, val]) => {
    const el = document.getElementById(id);
    if (el) el.dataset.target = val;
  });
}

// ---- Scroll Progress Bar ----
function initScrollProgress() {
  const bar = document.createElement("div");
  bar.className = "scroll-progress-bar";
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  });
}

// ---- INIT ----
export function initTheme() {
  initMegaMenu();
  initMobileNav();
  initNavCvSync();
  initStatStripCounters();
  initScrollProgress();
}
