// ============================================
//  app.js — Main Portfolio Application
// ============================================
import {
  collection, getDocs, doc, getDoc, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ---- Typing Effect ----
const ROLES = [
  "Web Developer",
  "UI/UX Enthusiast",
  "Mahasiswa Informatika",
  "Problem Solver",
  "Open Source Contributor"
];
let roleIdx = 0, charIdx = 0, deleting = false;
function typeRole() {
  const el = document.getElementById("typedText");
  if (!el) return;
  const role = ROLES[roleIdx];
  if (!deleting) {
    el.textContent = role.slice(0, ++charIdx);
    if (charIdx === role.length) { deleting = true; return setTimeout(typeRole, 1800); }
  } else {
    el.textContent = role.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; }
  }
  setTimeout(typeRole, deleting ? 55 : 95);
}

// ---- Particle Canvas ----
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let particles = [];
  const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
  resize();
  window.addEventListener("resize", resize);
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(37,99,235,${this.alpha})`;
      ctx.fill();
    }
  }
  for (let i = 0; i < 120; i++) particles.push(new Particle());
  // Draw connections
  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${0.08 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
}

// ---- Scroll Animations ----
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));
}

// ---- Navbar ----
function initNavbar() {
  const nav = document.getElementById("navbar");
  const links = document.querySelectorAll(".nav-link");
  const toggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 50);
    document.getElementById("backToTop")?.classList.toggle("visible", window.scrollY > 400);
    // Active link
    const scrollY = window.scrollY + 120;
    links.forEach(link => {
      const sec = document.querySelector(link.getAttribute("href"));
      if (sec) {
        const top = sec.offsetTop, h = sec.offsetHeight;
        link.classList.toggle("active", scrollY >= top && scrollY < top + h);
      }
    });
  });

  toggle?.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navLinks?.classList.toggle("open");
  });

  // Close menu on link click
  links.forEach(link => link.addEventListener("click", () => {
    toggle?.classList.remove("active");
    navLinks?.classList.remove("open");
  }));

  document.getElementById("backToTop")?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.getElementById("footerYear").textContent = new Date().getFullYear();
}

// ---- Load Profile from Firestore ----
async function loadProfile() {
  try {
    const snap = await getDoc(doc(window.db, "profile", "main"));
    if (!snap.exists()) return;
    const d = snap.data();
    if (d.name) {
      document.getElementById("heroName").textContent = d.name;
      document.getElementById("footerName").textContent = d.name;
    }
    if (d.description)   document.getElementById("heroDesc").textContent = d.description;
    if (d.avatarUrl)     document.getElementById("heroAvatar").src = d.avatarUrl;
    if (d.aboutAvatar)   document.getElementById("aboutAvatar").src = d.aboutAvatar;
    if (d.aboutText)     document.getElementById("aboutText").textContent = d.aboutText;
    if (d.university)    document.getElementById("infoUniversity").textContent = d.university;
    if (d.major)         document.getElementById("infoMajor").textContent = d.major;
    if (d.year)          document.getElementById("infoYear").textContent = d.year;
    if (d.location)      document.getElementById("infoLocation").textContent = d.location;
    if (d.cvUrl)         document.getElementById("cvDownload").href = d.cvUrl;
    if (d.interests?.length) {
      const container = document.getElementById("interestsTags");
      container.innerHTML = d.interests.map(i => `<span class="tag">${i}</span>`).join("");
    }
  } catch (e) { console.warn("Profile load failed:", e.message); }
}

// ---- Load Contacts ----
async function loadContacts() {
  try {
    const snap = await getDoc(doc(window.db, "contacts", "main"));
    if (!snap.exists()) return;
    const d = snap.data();
    if (d.email) {
      document.getElementById("contactEmail").textContent = d.email;
      document.getElementById("contactEmail").href = `mailto:${d.email}`;
      document.getElementById("ctaEmail").href = `mailto:${d.email}`;
    }
    if (d.github) {
      document.getElementById("contactGithub").textContent = d.github;
      document.getElementById("contactGithub").href = `https://${d.github.replace("https://","").replace("http://","")}`;
      document.getElementById("socialGithub").href = `https://${d.github.replace("https://","").replace("http://","")}`;
    }
    if (d.linkedin) {
      document.getElementById("contactLinkedin").textContent = d.linkedin;
      document.getElementById("contactLinkedin").href = `https://${d.linkedin.replace("https://","").replace("http://","")}`;
      document.getElementById("socialLinkedin").href = `https://${d.linkedin.replace("https://","").replace("http://","")}`;
    }
    if (d.instagram) {
      document.getElementById("socialInstagram").href = `https://instagram.com/${d.instagram.replace("@","")}`;
    }
    if (d.whatsapp) {
      const num = d.whatsapp.replace(/[^0-9]/g,"");
      document.getElementById("contactWhatsapp").textContent = d.whatsapp;
      document.getElementById("contactWhatsapp").href = `https://wa.me/${num}`;
      document.getElementById("ctaWhatsapp").href = `https://wa.me/${num}`;
    }
  } catch (e) { console.warn("Contacts load failed:", e.message); }
}

// ---- Load Skills ----
async function loadSkills() {
  const grid = document.getElementById("skillsGrid");
  try {
    const snap = await getDocs(query(collection(window.db, "skills"), orderBy("order", "asc")));
    if (snap.empty) {
      grid.innerHTML = renderEmpty("Belum ada skill yang ditambahkan.");
      return;
    }
    grid.innerHTML = "";
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });

    snap.forEach(docSnap => {
      const d = docSnap.data();
      const card = document.createElement("div");
      card.className = "skill-card";
      card.innerHTML = `
        <img class="skill-logo" src="${d.logoUrl || `https://skillicons.dev/icons?i=${d.name.toLowerCase()}`}" alt="${d.name}" onerror="this.src='https://via.placeholder.com/52x52/1E293B/94A3B8?text=${d.name[0]}'" />
        <div class="skill-name">${d.name}</div>
        <div class="skill-bar-wrap"><div class="skill-bar" data-pct="${d.level || 80}"></div></div>
        <span class="skill-pct">${d.level || 80}%</span>
      `;
      grid.appendChild(card);
      io.observe(card);
      // Animate bar on visibility
      const observer2 = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const bar = e.target.querySelector(".skill-bar");
            if (bar) bar.style.width = bar.dataset.pct + "%";
            observer2.unobserve(e.target);
          }
        });
      }, { threshold: 0.5 });
      observer2.observe(card);
    });
  } catch (e) {
    grid.innerHTML = renderEmpty("Gagal memuat skill.");
    console.warn("Skills load failed:", e.message);
  }
}

// ---- Load Projects ----
async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  const filterBar = document.getElementById("projectsFilter");
  try {
    const snap = await getDocs(query(collection(window.db, "projects"), orderBy("order", "asc")));
    if (snap.empty) {
      grid.innerHTML = renderEmpty("Belum ada proyek yang ditambahkan.");
      return;
    }
    const projects = [];
    snap.forEach(d => projects.push({ id: d.id, ...d.data() }));

    // Build filter buttons
    const allTechs = [...new Set(projects.flatMap(p => p.tech || []))].sort();
    filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">Semua</button>`;
    allTechs.slice(0, 6).forEach(t => {
      const b = document.createElement("button");
      b.className = "filter-btn"; b.dataset.filter = t; b.textContent = t;
      filterBar.appendChild(b);
    });
    filterBar.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      grid.querySelectorAll(".project-card").forEach(card => {
        const show = filter === "all" || (card.dataset.tech || "").includes(filter);
        card.style.display = show ? "" : "none";
      });
    });

    grid.innerHTML = "";
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });

    projects.forEach(p => {
      const card = document.createElement("div");
      card.className = "project-card";
      card.dataset.tech = (p.tech || []).join(",");
      card.innerHTML = `
        ${p.thumbnail
          ? `<img class="project-thumb" src="${p.thumbnail}" alt="${p.title}" loading="lazy" />`
          : `<div class="project-thumb-placeholder"><i class="fa-solid fa-code"></i></div>`}
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description || ""}</p>
          <div class="project-tech">${(p.tech || []).map(t => `<span class="tech-badge">${t}</span>`).join("")}</div>
          <div class="project-links">
            ${p.github ? `<a href="${p.github}" class="project-link gh" target="_blank"><i class="fa-brands fa-github"></i> GitHub</a>` : ""}
            ${p.demo   ? `<a href="${p.demo}"   class="project-link demo" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a>` : ""}
          </div>
        </div>
      `;
      grid.appendChild(card);
      io.observe(card);
    });
  } catch (e) {
    grid.innerHTML = renderEmpty("Gagal memuat proyek.");
    console.warn("Projects load failed:", e.message);
  }
}

// ---- Load Certificates ----
async function loadCertificates() {
  const grid = document.getElementById("certsGrid");
  try {
    const snap = await getDocs(query(collection(window.db, "certificates"), orderBy("year", "desc")));
    if (snap.empty) { grid.innerHTML = renderEmpty("Belum ada sertifikat."); return; }
    grid.innerHTML = "";
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });

    snap.forEach(d => {
      const cert = { id: d.id, ...d.data() };
      const card = document.createElement("div");
      card.className = "cert-card";
      card.innerHTML = `
        ${cert.imageUrl
          ? `<img class="cert-img" src="${cert.imageUrl}" alt="${cert.title}" loading="lazy" />`
          : `<div class="cert-img-placeholder"><i class="fa-solid fa-certificate"></i></div>`}
        <div class="cert-body">
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer">${cert.issuer || ""}</div>
          <div class="cert-year">${cert.year || ""}</div>
        </div>
      `;
      card.addEventListener("click", () => {
        if (cert.imageUrl) openCertModal(cert.imageUrl, cert.title);
      });
      grid.appendChild(card);
      io.observe(card);
    });
    initCertModal();
  } catch (e) {
    grid.innerHTML = renderEmpty("Gagal memuat sertifikat.");
    console.warn("Certificates load failed:", e.message);
  }
}

function openCertModal(imgUrl, title) {
  const overlay = document.getElementById("certModal");
  if (!overlay) return;
  overlay.querySelector(".modal-img").src = imgUrl;
  overlay.querySelector(".modal-img").alt = title;
  overlay.classList.add("open");
}
function initCertModal() {
  if (document.getElementById("certModal")) return;
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay"; overlay.id = "certModal";
  overlay.innerHTML = `
    <div class="modal-box" style="position:relative">
      <button class="modal-close" id="certModalClose" style="position:absolute;top:12px;right:12px;z-index:1"><i class="fa-solid fa-xmark"></i></button>
      <img class="modal-img" src="" alt="" />
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.classList.remove("open"); });
  document.getElementById("certModalClose").addEventListener("click", () => overlay.classList.remove("open"));
}

// ---- Load Experience ----
async function loadExperience() {
  const timeline = document.getElementById("experienceTimeline");
  try {
    const snap = await getDocs(query(collection(window.db, "experiences"), orderBy("startDate", "desc")));
    if (snap.empty) { timeline.innerHTML = `<p style="color:var(--text-dim);margin-left:40px">Belum ada pengalaman.</p>`; return; }
    timeline.innerHTML = "";
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });

    const badgeMap = { org: "badge-org", event: "badge-event", intern: "badge-intern", competition: "badge-competition" };
    const typeLabel = { org: "Organisasi", event: "Kepanitiaan", intern: "Magang", competition: "Kompetisi" };

    snap.forEach(d => {
      const exp = { id: d.id, ...d.data() };
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-date">${exp.startDate || ""} ${exp.endDate ? "— " + exp.endDate : ""}</div>
        <div class="timeline-card">
          ${exp.type ? `<span class="timeline-badge ${badgeMap[exp.type] || "badge-org"}">${typeLabel[exp.type] || exp.type}</span>` : ""}
          <div class="timeline-title">${exp.role || exp.title}</div>
          <div class="timeline-org">${exp.organization}</div>
          ${exp.description ? `<div class="timeline-desc">${exp.description}</div>` : ""}
        </div>`;
      timeline.appendChild(item);
      io.observe(item);
    });
  } catch (e) {
    timeline.innerHTML = `<p style="color:var(--text-dim);margin-left:40px">Gagal memuat pengalaman.</p>`;
    console.warn("Experience load failed:", e.message);
  }
}

// ---- Helper ----
function renderEmpty(msg) {
  return `<div class="empty-state"><i class="fa-solid fa-box-open"></i><p>${msg}</p></div>`;
}

// ---- Load Work Experience ----
async function loadWork() {
  const list = document.getElementById("workList");
  if (!list) return;
  try {
    const snap = await getDocs(query(collection(window.db, "work"), orderBy("startDate", "desc")));
    if (snap.empty) { list.innerHTML = renderEmpty("Belum ada pengalaman kerja."); return; }
    list.innerHTML = "";
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.08 });

    snap.forEach(d => {
      const w = { id: d.id, ...d.data() };
      const card = buildWorkCard(w);
      list.appendChild(card);
      io.observe(card);
    });
  } catch (e) {
    list.innerHTML = renderEmpty("Gagal memuat pengalaman kerja.");
    console.warn("Work load failed:", e.message);
  }
}

function buildWorkCard(w) {
  const typeLabel  = { fulltime: "Full-time", parttime: "Part-time", intern: "Magang", freelance: "Freelance", contract: "Kontrak" };
  const typeClass  = { fulltime: "work-type-fulltime", parttime: "work-type-parttime", intern: "work-type-intern", freelance: "work-type-freelance", contract: "work-type-contract" };

  // Duration in months
  let durationStr = "";
  try {
    if (w.startDate) {
      const start = new Date(w.startDate);
      const end   = w.current ? new Date() : (w.endDate ? new Date(w.endDate) : new Date());
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      if (months >= 12) {
        const y = Math.floor(months / 12), m = months % 12;
        durationStr = y + " thn" + (m ? " " + m + " bln" : "");
      } else {
        durationStr = months + " bulan";
      }
    }
  } catch(_) {}

  // Format display dates
  const fmtDate = (iso) => {
    if (!iso) return "";
    try {
      return new Date(iso).toLocaleDateString("id-ID", { month: "short", year: "numeric" });
    } catch(_) { return iso; }
  };
  const startDisp = fmtDate(w.startDate);
  const endDisp   = w.current ? "" : fmtDate(w.endDate);

  const card = document.createElement("div");
  card.className = "work-card";
  card.innerHTML = `
    <div class="work-logo-wrap">
      ${w.logoUrl
        ? `<img class="work-logo" src="${w.logoUrl}" alt="${w.company}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'" /><span class="work-logo-placeholder" style="display:none">${(w.company||"?")[0]}</span>`
        : `<span class="work-logo-placeholder">${(w.company||"?")[0].toUpperCase()}</span>`}
    </div>

    <div class="work-content">
      <div class="work-header">
        <span class="work-title">${w.jobTitle}</span>
        ${w.type ? `<span class="work-type-badge ${typeClass[w.type]||"work-type-intern"}">${typeLabel[w.type]||w.type}</span>` : ""}
        ${w.current ? `<span class="work-current-dot">Sekarang</span>` : ""}
      </div>

      <div class="work-company">
        ${w.companyUrl
          ? `<a href="${w.companyUrl}" target="_blank" rel="noopener">${w.company}</a><i class="fa-solid fa-arrow-up-right-from-square"></i>`
          : w.company || ""}
      </div>

      <div class="work-meta">
        <span class="work-meta-item"><i class="fa-regular fa-calendar"></i> ${startDisp}${endDisp ? " – " + endDisp : ""}${w.current ? " – Sekarang" : ""}</span>
        ${w.location ? `<span class="work-meta-item"><i class="fa-solid fa-location-dot"></i> ${w.location}</span>` : ""}
        ${w.locationType ? `<span class="work-meta-item"><i class="fa-solid fa-${w.locationType==="remote"?"wifi":w.locationType==="hybrid"?"arrows-split-up-and-left":"building"}"></i> ${w.locationType==="remote"?"Remote":w.locationType==="hybrid"?"Hybrid":"On-site"}</span>` : ""}
      </div>

      ${w.description ? `<p class="work-desc">${w.description}</p>` : ""}

      ${w.achievements?.length
        ? `<ul class="work-achievements">${w.achievements.map(a=>`<li>${a}</li>`).join("")}</ul>`
        : ""}

      ${(w.tech||[]).length
        ? `<div class="work-tech">${w.tech.map(t=>`<span class="tech-badge">${t}</span>`).join("")}</div>`
        : ""}
    </div>

    <div class="work-duration">
      <div class="work-duration-label">${startDisp.split(" ")[1] || ""}</div>
      ${durationStr ? `<div class="work-duration-months">${durationStr}</div>` : ""}
    </div>
  `;
  return card;
}

// ---- Demo / Fallback Data (jika Firebase belum dikonfigurasi) ----
async function loadDemoData() {
  // Profile
  document.getElementById("heroName").textContent = "Nama Kamu";
  document.getElementById("heroDesc").textContent = "Mahasiswa Informatika yang passionate di bidang web development, selalu belajar teknologi baru.";
  document.getElementById("infoUniversity").textContent = "Universitas Kamu";
  document.getElementById("infoMajor").textContent = "Teknik Informatika";
  document.getElementById("infoYear").textContent = "2022";
  document.getElementById("infoLocation").textContent = "Indonesia";
  document.getElementById("footerName").textContent = "Nama Kamu";

  // Skills (demo)
  const demoSkills = [
    { name: "HTML", level: 90, logoUrl: "https://skillicons.dev/icons?i=html" },
    { name: "CSS", level: 85, logoUrl: "https://skillicons.dev/icons?i=css" },
    { name: "JavaScript", level: 80, logoUrl: "https://skillicons.dev/icons?i=js" },
    { name: "Python", level: 70, logoUrl: "https://skillicons.dev/icons?i=python" },
    { name: "Firebase", level: 75, logoUrl: "https://skillicons.dev/icons?i=firebase" },
    { name: "Git", level: 80, logoUrl: "https://skillicons.dev/icons?i=git" },
  ];
  const grid = document.getElementById("skillsGrid");
  grid.innerHTML = "";
  const io = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); io.unobserve(x.target); }}); }, { threshold: 0.1 });
  demoSkills.forEach(s => {
    const card = document.createElement("div");
    card.className = "skill-card";
    card.innerHTML = `<img class="skill-logo" src="${s.logoUrl}" alt="${s.name}" /><div class="skill-name">${s.name}</div><div class="skill-bar-wrap"><div class="skill-bar" data-pct="${s.level}"></div></div><span class="skill-pct">${s.level}%</span>`;
    grid.appendChild(card);
    io.observe(card);
    const obs2 = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.querySelector(".skill-bar").style.width = x.target.querySelector(".skill-bar").dataset.pct + "%"; obs2.unobserve(x.target); }}); }, { threshold: 0.5 });
    obs2.observe(card);
  });

  // Projects (demo)
  const demoProjects = [
    { title: "Website UMKM Penjahit", description: "Sistem pemesanan jasa jahit online berbasis web dengan fitur katalog dan booking.", tech: ["HTML", "CSS", "JavaScript", "Firebase"], github: "#", demo: "#" },
    { title: "Sistem Absensi Sekolah", description: "Aplikasi absensi digital dengan QR Code untuk siswa dan laporan real-time.", tech: ["JavaScript", "Firebase"], github: "#", demo: "#" },
    { title: "Blog Pribadi", description: "Blog personal yang dibangun dengan HTML/CSS murni, mendukung artikel dan kategori.", tech: ["HTML", "CSS"], github: "#", demo: "#" },
  ];
  const pgrid = document.getElementById("projectsGrid");
  pgrid.innerHTML = "";
  const pio = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); pio.unobserve(x.target); }}); }, { threshold: 0.1 });
  demoProjects.forEach(p => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `<div class="project-thumb-placeholder"><i class="fa-solid fa-code"></i></div><div class="project-body"><h3 class="project-title">${p.title}</h3><p class="project-desc">${p.description}</p><div class="project-tech">${p.tech.map(t=>`<span class="tech-badge">${t}</span>`).join("")}</div><div class="project-links"><a href="${p.github}" class="project-link gh"><i class="fa-brands fa-github"></i> GitHub</a><a href="${p.demo}" class="project-link demo"><i class="fa-solid fa-arrow-up-right-from-square"></i> Demo</a></div></div>`;
    pgrid.appendChild(card); pio.observe(card);
  });

  // Certificates (demo)
  const cgrid = document.getElementById("certsGrid");
  const demoCerts = [
    { title: "Web Development Fundamentals", issuer: "Dicoding Indonesia", year: "2024" },
    { title: "JavaScript Intermediate", issuer: "Dicoding Indonesia", year: "2024" },
    { title: "Google UX Design", issuer: "Coursera", year: "2023" },
  ];
  cgrid.innerHTML = "";
  const cio = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); cio.unobserve(x.target); }}); }, { threshold: 0.1 });
  demoCerts.forEach(c => {
    const card = document.createElement("div");
    card.className = "cert-card";
    card.innerHTML = `<div class="cert-img-placeholder"><i class="fa-solid fa-certificate"></i></div><div class="cert-body"><div class="cert-title">${c.title}</div><div class="cert-issuer">${c.issuer}</div><div class="cert-year">${c.year}</div></div>`;
    cgrid.appendChild(card); cio.observe(card);
  });

  // Work Experience (demo)
  const wlist = document.getElementById("workList");
  const demoWork = [
    {
      jobTitle: "Web Developer Intern",
      company: "PT. Teknologi Maju Indonesia",
      companyUrl: "",
      type: "intern",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      current: false,
      location: "Malang, Indonesia",
      locationType: "hybrid",
      description: "Mengembangkan dan memelihara fitur dashboard admin sistem manajemen konten perusahaan menggunakan JavaScript dan Firebase.",
      achievements: [
        "Membangun modul pelaporan otomatis yang mengurangi waktu rekap data 40%",
        "Mengintegrasikan Firebase Realtime Database untuk fitur notifikasi live",
        "Berkolaborasi dengan tim desainer untuk implementasi redesign UI dashboard"
      ],
      tech: ["JavaScript", "Firebase", "HTML", "CSS", "Git"],
      logoUrl: ""
    },
    {
      jobTitle: "Freelance Web Developer",
      company: "Klien Mandiri",
      companyUrl: "",
      type: "freelance",
      startDate: "2023-01-01",
      endDate: "",
      current: true,
      location: "Remote",
      locationType: "remote",
      description: "Menerima dan mengerjakan proyek web development untuk UMKM dan individu, mulai dari landing page hingga sistem informasi sederhana.",
      achievements: [
        "Menyelesaikan 5+ proyek website untuk klien UMKM lokal",
        "Rata-rata rating kepuasan klien 4.8/5",
        "Spesialisasi pada website bisnis dengan integrasi Firebase"
      ],
      tech: ["HTML", "CSS", "JavaScript", "Firebase", "Figma"],
      logoUrl: ""
    }
  ];
  if (wlist) {
    wlist.innerHTML = "";
    const wio = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); wio.unobserve(x.target); }}); }, { threshold: 0.08 });
    demoWork.forEach(w => { const card = buildWorkCard(w); wlist.appendChild(card); wio.observe(card); });
  }

  // Experience (demo)
  const timeline = document.getElementById("experienceTimeline");
  const demoExp = [
    { role: "Ketua Divisi Web", organization: "Himpunan Mahasiswa Informatika", type: "org", startDate: "2023", endDate: "2024", description: "Memimpin tim web untuk membangun website resmi himpunan." },
    { role: "Peserta", organization: "Hackathon Nasional 2023", type: "competition", startDate: "Okt 2023", description: "Berhasil masuk 10 besar dari 200+ tim peserta." },
    { role: "Web Developer Intern", organization: "PT. Teknologi Maju", type: "intern", startDate: "Jun 2023", endDate: "Agu 2023", description: "Mengembangkan fitur dashboard admin menggunakan JavaScript dan Firebase." },
  ];
  timeline.innerHTML = "";
  const tio = new IntersectionObserver((e) => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add("visible"); tio.unobserve(x.target); }}); }, { threshold: 0.1 });
  const bm = { org:"badge-org", event:"badge-event", intern:"badge-intern", competition:"badge-competition" };
  const tl = { org:"Organisasi", event:"Kepanitiaan", intern:"Magang", competition:"Kompetisi" };
  demoExp.forEach(exp => {
    const item = document.createElement("div"); item.className = "timeline-item";
    item.innerHTML = `<div class="timeline-dot"></div><div class="timeline-date">${exp.startDate}${exp.endDate?" — "+exp.endDate:""}</div><div class="timeline-card"><span class="timeline-badge ${bm[exp.type]||"badge-org"}">${tl[exp.type]||exp.type}</span><div class="timeline-title">${exp.role}</div><div class="timeline-org">${exp.organization}</div>${exp.description?`<div class="timeline-desc">${exp.description}</div>`:""}</div>`;
    timeline.appendChild(item); tio.observe(item);
  });
}

// ---- INIT ----
export async function initApp() {
  typeRole();
  initParticles();
  initNavbar();
  initReveal();

  // Check if Firebase is configured
  const isConfigured = !window.db._databaseId?.projectId?.includes("YOUR_PROJECT_ID");

  if (isConfigured) {
    await Promise.allSettled([
      loadProfile(),
      loadContacts(),
      loadSkills(),
      loadProjects(),
      loadCertificates(),
      loadExperience(),
      loadWork(),
    ]);
  } else {
    console.info("🔧 Firebase belum dikonfigurasi, menampilkan demo data.");
    await loadDemoData();
  }
}
