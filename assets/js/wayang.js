// ============================================
//  wayang.js — Tema Jawa Formal (ITS-inspired)
//  Mega Menu, Stat Counter, Batik Halus
// ============================================

// ============================================
//  1. MEGA MENU — desktop hover + mobile tap
// ============================================
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

  // Tutup mega menu mobile saat klik link di dalamnya
  document.querySelectorAll(".mega-link, .mega-feature-link").forEach(link => {
    link.addEventListener("click", () => {
      megaItems.forEach(i => i.classList.remove("mobile-open"));
      document.getElementById("navLinks")?.classList.remove("open");
      document.getElementById("navBackdrop")?.classList.remove("open");
    });
  });
}

// ============================================
//  2. MOBILE NAV TOGGLE + BACKDROP
// ============================================
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

// ============================================
//  3. CV BUTTON DI NAVBAR — sinkron dengan link CV hero
// ============================================
function initNavCvSync() {
  const navCv = document.getElementById("navCvBtn");
  const heroCv = document.getElementById("cvDownload");
  if (!navCv || !heroCv) return;
  // Salin href setiap kali hero CV diperbarui (mis. setelah data Firestore masuk)
  const sync = () => { navCv.href = heroCv.href; navCv.target = "_blank"; };
  sync();
  // Observe perubahan href hero (karena diisi async oleh app.js)
  const observer = new MutationObserver(sync);
  observer.observe(heroCv, { attributes: true, attributeFilter: ["href"] });
}

// ============================================
//  4. STAT STRIP COUNTER — animasi angka naik
// ============================================
function animateCounter(el, target, duration = 1200) {
  if (!el) return;
  const start = 0;
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.floor(start + (target - start) * eased);
    el.textContent = value;
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
        // Nilai diambil dari data-target yang diisi app.js setelah load data
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

// Dipanggil oleh app.js setelah data Firestore/demo selesai dimuat
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

// ============================================
//  5. BATIK CORNER — motif halus pojok section
// ============================================
function buildBatikCornerSVG() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 140 140");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.innerHTML = `
    <g fill="none" stroke="#7A0C1E" stroke-width="1.2">
      <ellipse cx="35" cy="20" rx="16" ry="11"/>
      <ellipse cx="35" cy="50" rx="16" ry="11"/>
      <ellipse cx="10" cy="35" rx="11" ry="16"/>
      <ellipse cx="60" cy="35" rx="11" ry="16"/>
      <circle cx="35" cy="35" r="6"/>
    </g>
    <g fill="none" stroke="#B8902F" stroke-width="1">
      <path d="M75 10 Q95 25 90 50 Q105 60 100 80" />
      <circle cx="75" cy="10" r="3" fill="#B8902F"/>
      <circle cx="100" cy="80" r="3" fill="#B8902F"/>
    </g>
  `;
  return svg;
}

function insertBatikCorners() {
  // Sisipkan hanya di section dengan id tertentu agar tidak berlebihan
  const targets = ["#about", "#contact"];
  targets.forEach(sel => {
    const section = document.querySelector(sel);
    if (!section) return;
    section.style.position = "relative";
    section.style.overflow = "hidden";

    const tl = buildBatikCornerSVG();
    tl.classList.add("batik-corner", "tl");
    section.appendChild(tl);

    const br = buildBatikCornerSVG();
    br.classList.add("batik-corner", "br");
    section.appendChild(br);
  });
}

// ============================================
//  6. PARANG ORNAMENT — pemisah judul section
// ============================================
function buildParangOrnament() {
  const el = document.createElement("div");
  el.className = "parang-ornament";
  el.innerHTML = `
    <div class="parang-ornament-center">
      <div class="parang-diamond sm"></div>
      <div class="parang-diamond"></div>
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8 Q8 2 16 8 Q24 14 30 8" stroke="#B8902F" stroke-width="1.2" fill="none"/>
        <circle cx="16" cy="8" r="2" fill="#B8902F"/>
      </svg>
      <div class="parang-diamond"></div>
      <div class="parang-diamond sm"></div>
    </div>
  `;
  return el;
}

function insertParangOrnaments() {
  document.querySelectorAll(".section-header").forEach(header => {
    const title = header.querySelector(".section-title");
    if (title && !header.querySelector(".parang-ornament")) {
      title.after(buildParangOrnament());
    }
  });
}

// ============================================
//  7. SCROLL PROGRESS BAR
// ============================================
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

// ============================================
//  8. AKSARA JAWA — footer, kecil & formal
// ============================================
function insertJavaneseFooterDeco() {
  const footer = document.querySelector(".footer .container");
  if (!footer) return;
  const deco = document.createElement("div");
  deco.className = "footer-javanese";
  deco.textContent = "꧁ ꦲꦤꦕꦫꦏ ꧂";
  footer.prepend(deco);

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+Javanese&display=swap";
  document.head.appendChild(link);
}

// ============================================
//  INIT SEMUA
// ============================================
export function initWayang() {
  initMegaMenu();
  initMobileNav();
  initNavCvSync();
  initStatStripCounters();
  insertBatikCorners();
  insertParangOrnaments();
  initScrollProgress();
  insertJavaneseFooterDeco();
}
