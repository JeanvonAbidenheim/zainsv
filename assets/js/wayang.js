// ============================================
//  wayang.js — Animasi Nuansa Jawa
//  Gunungan, Batik Particles, Cursor Sparks,
//  Parang Ornaments, Kendhang Loader
// ============================================

// ============================================
//  1. GUNUNGAN / KAYON SVG — hero background
// ============================================
function createGunungan(side) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 220 600");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.className.baseVal = `hero-gunungan ${side}`;

  // Bentuk dasar gunungan (silhuet)
  svg.innerHTML = `
    <defs>
      <linearGradient id="gunGrad${side}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"   stop-color="#C9A84C" stop-opacity="1"/>
        <stop offset="50%"  stop-color="#7C1D2E" stop-opacity="1"/>
        <stop offset="100%" stop-color="#C9A84C" stop-opacity="0.6"/>
      </linearGradient>
      <linearGradient id="gunGrad2${side}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#C9A84C" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#7C1D2E" stop-opacity="0.4"/>
      </linearGradient>
    </defs>

    <!-- Tangkai bawah -->
    <rect x="95" y="520" width="30" height="80" rx="4" fill="url(#gunGrad2${side})"/>
    <!-- Dasar oval -->
    <ellipse cx="110" cy="520" rx="52" ry="14" fill="url(#gunGrad${side})"/>

    <!-- Badan utama gunungan — bentuk lancip ke atas -->
    <path d="
      M 110 20
      C 130 60, 168 100, 162 160
      C 168 200, 170 240, 162 280
      C 158 310, 160 340, 155 370
      C 150 400, 148 430, 145 460
      C 140 490, 130 510, 110 520
      C 90  510, 80  490, 75  460
      C 72  430, 70  400, 65  370
      C 60  340, 62  310, 58  280
      C 50  240, 52  200, 58  160
      C 52  100, 90  60, 110 20
      Z
    " fill="url(#gunGrad${side})" opacity="0.9"/>

    <!-- Ornamen dalam — lapisan 1 -->
    <path d="
      M 110 50
      C 125 80, 152 115, 148 165
      C 152 200, 150 240, 144 272
      C 138 310, 140 340, 135 368
      C 130 396, 126 425, 123 455
      L 110 500
      L 97  455
      C 94  425, 90  396, 85  368
      C 80  340, 82  310, 76  272
      C 70  240, 68  200, 72  165
      C 68  115, 95  80, 110 50
      Z
    " fill="none" stroke="#C9A84C" stroke-width="1" opacity="0.5"/>

    <!-- Ornamen dalam — lapisan 2 -->
    <path d="
      M 110 80
      C 120 105, 138 135, 136 175
      C 140 210, 138 245, 132 274
      C 126 308, 128 336, 124 362
      C 120 388, 116 415, 113 445
      L 110 480
      L 107 445
      C 104 415, 100 388, 96  362
      C 92  336, 94  308, 88  274
      C 82  245, 80  210, 84  175
      C 82  135, 100 105, 110 80
      Z
    " fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.35"/>

    <!-- Motif batik: lingkaran-lingkaran kawung -->
    ${buildKawungPattern(side)}

    <!-- Mahkota / puncak gunungan -->
    <path d="M 110 10 L 116 30 L 110 25 L 104 30 Z" fill="#C9A84C" opacity="0.9"/>
    <path d="M 110 5  L 113 18 L 110 15 L 107 18 Z" fill="#C9A84C" opacity="0.7"/>
    <circle cx="110" cy="5" r="4" fill="#C9A84C" opacity="0.8"/>

    <!-- Garis-garis dekoratif horizontal (tekstur) -->
    ${buildHorizontalLines()}

    <!-- Mata wayang (dekoratif) di tengah -->
    <ellipse cx="110" cy="220" rx="18" ry="22" fill="none" stroke="#C9A84C" stroke-width="1.2" opacity="0.4"/>
    <ellipse cx="110" cy="220" rx="10" ry="13" fill="#7C1D2E" opacity="0.6"/>
    <ellipse cx="110" cy="220" rx="5"  ry="7"  fill="#C9A84C" opacity="0.3"/>

    <!-- Hiasan sayap kanan kiri -->
    <path d="M 162 180 Q 185 190 192 210 Q 185 215 170 208 Q 165 200 162 190 Z" fill="#C9A84C" opacity="0.3"/>
    <path d="M 58  180 Q 35  190 28  210 Q 35  215 50  208 Q 55  200 58  190 Z" fill="#C9A84C" opacity="0.3"/>

    <!-- Sayap lebih kecil atas -->
    <path d="M 155 130 Q 175 135 180 150 Q 172 155 160 148 Z" fill="#C9A84C" opacity="0.25"/>
    <path d="M 65  130 Q 45  135 40  150 Q 48  155 60  148 Z" fill="#C9A84C" opacity="0.25"/>
  `;
  return svg;
}

function buildKawungPattern(side) {
  let paths = "";
  const positions = [
    [110, 340], [92, 355], [128, 355],
    [110, 370], [92, 385], [128, 385],
    [110, 400], [110, 310],
  ];
  positions.forEach(([cx, cy]) => {
    paths += `
      <ellipse cx="${cx}"    cy="${cy}" rx="9" ry="7" fill="none" stroke="#C9A84C" stroke-width="0.7" opacity="0.35"/>
      <ellipse cx="${cx}"    cy="${cy}" rx="5" ry="4" fill="none" stroke="#C9A84C" stroke-width="0.5" opacity="0.2"/>
    `;
  });
  return paths;
}

function buildHorizontalLines() {
  let lines = "";
  const yPositions = [120, 150, 250, 280, 310, 420, 450];
  yPositions.forEach(y => {
    // Lebar garis menyempit di atas (bentuk gunungan)
    const halfW = Math.min(50, 12 + (y / 600) * 55);
    lines += `
      <line x1="${110 - halfW}" y1="${y}" x2="${110 + halfW}" y2="${y}"
            stroke="#C9A84C" stroke-width="0.6" opacity="0.2"/>
    `;
  });
  return lines;
}

function initGunungan() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.appendChild(createGunungan("left"));
  hero.appendChild(createGunungan("right"));
}

// ============================================
//  2. BATIK PARTICLE CANVAS — menggantikan biru
// ============================================
function initBatikParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let W, H, particles = [], batikShapes = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener("resize", () => { resize(); buildBatik(); });

  // Partikel melayang — titik emas kecil
  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.4 + 0.3;
      this.vx    = (Math.random() - 0.5) * 0.25;
      this.vy    = (Math.random() - 0.5) * 0.25;
      this.alpha = Math.random() * 0.35 + 0.05;
      this.gold  = Math.random() > 0.4; // gold atau merah
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      if (this.gold) {
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${this.alpha})`;
      } else {
        // Berbentuk diamond kecil untuk maroon
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = `rgba(124,29,46,${this.alpha * 1.5})`;
        ctx.fillRect(-this.r, -this.r, this.r * 2, this.r * 2);
        ctx.restore();
        return;
      }
      ctx.fill();
    }
  }

  // Motif batik statis — ornamen kawung di background
  class BatikShape {
    constructor() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.size  = Math.random() * 24 + 10;
      this.alpha = Math.random() * 0.06 + 0.02;
      this.type  = Math.floor(Math.random() * 3); // 0=kawung, 1=parang, 2=truntum
      this.rot   = Math.random() * Math.PI;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      ctx.globalAlpha = this.alpha;
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth   = 0.8;

      if (this.type === 0) {
        // Kawung: 4 elips
        const s = this.size;
        ctx.beginPath(); ctx.ellipse( s/2, 0,    s/2, s/3.5, 0, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(-s/2, 0,    s/2, s/3.5, 0, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(0,    s/2,  s/3.5, s/2, 0, 0, Math.PI*2); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(0,   -s/2,  s/3.5, s/2, 0, 0, Math.PI*2); ctx.stroke();
      } else if (this.type === 1) {
        // Parang: diagonal zigzag
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(-s, s); ctx.lineTo(0, -s); ctx.lineTo(s, s);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        // Truntum: bintang 8 titik
        const s = this.size * 0.5;
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const r = i % 2 === 0 ? s : s * 0.45;
          i === 0 ? ctx.moveTo(Math.cos(angle)*r, Math.sin(angle)*r)
                  : ctx.lineTo(Math.cos(angle)*r, Math.sin(angle)*r);
        }
        ctx.closePath(); ctx.stroke();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  }

  function buildBatik() {
    batikShapes = [];
    const count = Math.floor((W * H) / 28000);
    for (let i = 0; i < count; i++) batikShapes.push(new BatikShape());
  }

  // Inisialisasi
  for (let i = 0; i < 90; i++) particles.push(new Particle());
  buildBatik();

  // Koneksi antar partikel — warna gold tipis
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx   = particles[i].x - particles[j].x;
        const dy   = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 90) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(201,168,76,${0.07 * (1 - dist/90)})`;
          ctx.lineWidth   = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    batikShapes.forEach(b => b.draw());
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

// ============================================
//  3. CURSOR SPARKS — percikan gold
// ============================================
function initCursorSparks() {
  // Jangan aktifkan di touch device
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const colors = ["#C9A84C", "#E8C96A", "#7C1D2E", "#C0392B", "#F5ECD7"];
  let lastTime = 0;

  document.addEventListener("mousemove", (e) => {
    const now = Date.now();
    if (now - lastTime < 35) return; // throttle
    lastTime = now;

    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      const spark = document.createElement("div");
      spark.className = "cursor-spark";
      const size  = Math.random() * 5 + 3;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const angle = Math.random() * Math.PI * 2;
      const dist  = Math.random() * 18 + 4;
      const dx    = Math.cos(angle) * dist;
      const dy    = Math.sin(angle) * dist;

      Object.assign(spark.style, {
        left:            e.clientX + "px",
        top:             e.clientY + "px",
        width:           size + "px",
        height:          size + "px",
        background:      color,
        boxShadow:       `0 0 ${size * 2}px ${color}`,
        transform:       `translate(-50%,-50%)`,
        animationDuration: (Math.random() * 0.4 + 0.3) + "s",
      });

      document.body.appendChild(spark);

      // Gerakkan spark ke arah random
      requestAnimationFrame(() => {
        spark.style.transition = spark.style.animationDuration + " ease-out";
        spark.style.transform  = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(0.1)`;
      });

      setTimeout(() => spark.remove(), 700);
    }
  });
}

// ============================================
//  4. PARANG ORNAMENTS — pemisah section
// ============================================
function buildParangOrnament() {
  const el = document.createElement("div");
  el.className = "parang-ornament";
  el.innerHTML = `
    <div class="parang-ornament-center">
      <div class="parang-diamond sm"></div>
      <div class="parang-diamond"></div>
      <svg width="32" height="16" viewBox="0 0 32 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="opacity:.7">
        <path d="M2 8 Q8 2 16 8 Q24 14 30 8" stroke="#C9A84C" stroke-width="1.2" fill="none"/>
        <path d="M2 8 Q8 14 16 8 Q24 2 30 8" stroke="#C9A84C" stroke-width="0.6" fill="none" opacity="0.4"/>
        <circle cx="16" cy="8" r="2" fill="#C9A84C" opacity="0.8"/>
      </svg>
      <div class="parang-diamond"></div>
      <div class="parang-diamond sm"></div>
    </div>
  `;
  return el;
}

function insertParangOrnaments() {
  // Sisipkan di setiap section-header setelah section-title
  document.querySelectorAll(".section-header").forEach(header => {
    const title = header.querySelector(".section-title");
    if (title) {
      const ornament = buildParangOrnament();
      title.after(ornament);
    }
  });
}

// ============================================
//  5. GUNUNGAN MINI — dekorasi section
// ============================================
function buildMiniGunungan() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 60 160");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "160");
  svg.innerHTML = `
    <defs>
      <linearGradient id="miniGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"   stop-color="#C9A84C" stop-opacity="0.8"/>
        <stop offset="100%" stop-color="#7C1D2E" stop-opacity="0.3"/>
      </linearGradient>
    </defs>
    <rect x="26" y="140" width="8" height="20" rx="2" fill="url(#miniGrad)" opacity="0.6"/>
    <ellipse cx="30" cy="140" rx="14" ry="4" fill="url(#miniGrad)"/>
    <path d="M30 5 C38 20 46 40 44 70 C46 90 44 110 42 125 C38 135 34 140 30 140 C26 140 22 135 18 125 C16 110 14 90 16 70 C14 40 22 20 30 5 Z" fill="url(#miniGrad)"/>
    <path d="M30 15 C36 28 40 50 38 72 C40 92 38 112 36 127 L30 138 L24 127 C22 112 20 92 22 72 C20 50 24 28 30 15 Z" fill="none" stroke="#C9A84C" stroke-width="0.8" opacity="0.4"/>
    <circle cx="30" cy="5" r="3" fill="#C9A84C" opacity="0.8"/>
    <!-- Kawung kecil -->
    <ellipse cx="30" cy="95" rx="5" ry="3.5" fill="none" stroke="#C9A84C" stroke-width="0.6" opacity="0.4"/>
    <ellipse cx="25" cy="100" rx="3.5" ry="5" fill="none" stroke="#C9A84C" stroke-width="0.6" opacity="0.4"/>
    <ellipse cx="35" cy="100" rx="3.5" ry="5" fill="none" stroke="#C9A84C" stroke-width="0.6" opacity="0.4"/>
    <ellipse cx="30" cy="105" rx="5" ry="3.5" fill="none" stroke="#C9A84C" stroke-width="0.6" opacity="0.4"/>
  `;
  return svg;
}

// ============================================
//  6. WAYANG BORDER FRAME — bingkai gold hero
// ============================================
function buildHeroBorderFrame() {
  const frame = document.createElement("div");
  frame.style.cssText = `
    position: absolute; inset: 0;
    pointer-events: none; z-index: 0;
    overflow: hidden;
  `;

  // Sudut kiri atas
  const corners = [
    { top: "20px", left: "20px",   transform: "none" },
    { top: "20px", right: "20px",  transform: "scaleX(-1)" },
    { bottom: "20px", left: "20px",  transform: "scaleY(-1)" },
    { bottom: "20px", right: "20px", transform: "scale(-1,-1)" },
  ];

  corners.forEach(pos => {
    const corner = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    corner.setAttribute("viewBox", "0 0 60 60");
    corner.setAttribute("width", "60");
    corner.setAttribute("height", "60");
    Object.assign(corner.style, { position: "absolute", opacity: "0.25", ...pos });
    corner.innerHTML = `
      <path d="M5 55 L5 10 Q5 5 10 5 L55 5" stroke="#C9A84C" stroke-width="1.5" fill="none"/>
      <path d="M5 45 L5 15 Q5 10 10 10 L45 10" stroke="#C9A84C" stroke-width="0.6" fill="none" opacity="0.5"/>
      <circle cx="5" cy="5" r="3" fill="#C9A84C"/>
      <path d="M18 5 L5 5 L5 18" stroke="#C9A84C" stroke-width="0.8" fill="none" opacity="0.6"/>
    `;
    frame.appendChild(corner);
  });

  return frame;
}

// ============================================
//  7. WAYANG SILHOUETTE di about section
// ============================================
function buildWayangSilhouette() {
  // Siluet sederhana figur wayang — punakawan style
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 80 200");
  svg.setAttribute("width", "80");
  svg.setAttribute("height", "200");
  svg.className.baseVal = "wayang-deco";
  svg.style.cssText = "right:0;bottom:0;position:absolute;";

  svg.innerHTML = `
    <g fill="#C9A84C">
      <!-- Kepala -->
      <ellipse cx="40" cy="28" rx="16" ry="20"/>
      <!-- Mahkota -->
      <path d="M28 14 L32 5 L36 12 L40 2 L44 12 L48 5 L52 14 Z"/>
      <!-- Mata -->
      <ellipse cx="34" cy="26" rx="3" ry="2" fill="#0D0608"/>
      <!-- Hidung panjang (khas wayang) -->
      <path d="M40 30 Q50 35 54 38 Q50 40 44 36 Q42 34 40 32 Z"/>
      <!-- Badan -->
      <path d="M30 48 Q20 60 22 80 Q24 100 30 110 L50 110 Q56 100 58 80 Q60 60 50 48 Z"/>
      <!-- Tangan kanan panjang (wayang) -->
      <path d="M50 55 Q65 70 72 90 Q68 95 64 88 Q60 75 50 65 Z"/>
      <!-- Tangan kiri -->
      <path d="M30 55 Q15 70 8 88 Q12 93 16 88 Q20 74 30 64 Z"/>
      <!-- Kain -->
      <path d="M28 108 Q24 130 22 160 Q30 165 38 160 L40 120 L42 160 Q50 165 58 160 Q56 130 52 108 Z"/>
      <!-- Kaki -->
      <rect x="29" y="158" width="10" height="36" rx="4"/>
      <rect x="41" y="158" width="10" height="36" rx="4"/>
    </g>
  `;
  return svg;
}

// ============================================
//  8. KENDHANG LOADER — ganti skeleton loading
// ============================================
function replaceSkeletonWithLoader(container) {
  if (!container) return;
  const loader = document.createElement("div");
  loader.className = "wayang-loading";
  loader.innerHTML = `<span></span><span></span><span></span>`;
  // Tambahkan teks kecil
  const wrap = document.createElement("div");
  wrap.style.cssText = "text-align:center;padding:20px 0";
  const label = document.createElement("p");
  label.style.cssText = "font-size:.75rem;color:var(--text-dim);margin-top:8px;letter-spacing:.1em;text-transform:uppercase";
  label.textContent = "Memuat...";
  wrap.appendChild(loader);
  wrap.appendChild(label);
  return wrap;
}

// ============================================
//  9. BATIK BORDER pada card saat hover
// ============================================
function initCardBatikBorder() {
  // Tambahkan efek shimmer gold pada card saat hover via JS
  const cards = document.querySelectorAll(
    ".skill-card, .project-card, .cert-card, .work-card, .contact-card, .timeline-card"
  );

  cards.forEach(card => {
    card.addEventListener("mouseenter", function() {
      this.style.setProperty("--hover-glow", "rgba(201,168,76,0.08)");
    });
    card.addEventListener("mouseleave", function() {
      this.style.removeProperty("--hover-glow");
    });
  });
}

// ============================================
//  10. AKSARA JAWA dekoratif di footer
// ============================================
function insertJavaneseDecoration() {
  const footer = document.querySelector(".footer .container");
  if (!footer) return;

  // Ornamen aksara Jawa (ꦲꦤꦕꦫꦏ = hanacaraka) — dirender sebagai SVG teks
  const deco = document.createElement("div");
  deco.style.cssText = `
    font-size: .95rem;
    color: rgba(201,168,76,0.25);
    letter-spacing: .3em;
    margin-bottom: 8px;
    font-family: 'Noto Serif Javanese', serif;
    user-select: none;
  `;
  deco.textContent = "꧁ ꦲꦤꦕꦫꦏ ꧂"; // Hanacaraka
  footer.prepend(deco);

  // Garis emas tipis di atas footer
  const line = document.createElement("div");
  line.style.cssText = `
    width:100%;height:1px;
    background:linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent);
    margin-bottom:20px;
  `;
  footer.prepend(line);
}

// ============================================
//  11. SCROLL PROGRESS BAR — gold di atas
// ============================================
function initScrollProgress() {
  const bar = document.createElement("div");
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #7C1D2E, #C9A84C, #E8C96A);
    z-index: 9999;
    transition: width .1s linear;
    box-shadow: 0 0 8px rgba(201,168,76,0.5);
  `;
  document.body.appendChild(bar);

  window.addEventListener("scroll", () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = (scrollTop / docHeight) * 100;
    bar.style.width  = pct + "%";
  });
}

// ============================================
//  12. WAYANG SHADOW pada avatar (kelir effect)
// ============================================
function initAvatarKelirEffect() {
  const avatar = document.querySelector(".hero-avatar");
  if (!avatar) return;

  // Tambah shadow keemasan berkilau
  avatar.style.filter = "drop-shadow(0 0 16px rgba(201,168,76,0.3))";

  // Subtle pulse glow
  const style = document.createElement("style");
  style.textContent = `
    @keyframes avatar-kelir {
      0%,100% { filter: drop-shadow(0 0 12px rgba(201,168,76,0.25)); }
      50%      { filter: drop-shadow(0 0 24px rgba(201,168,76,0.45)) drop-shadow(0 0 40px rgba(124,29,46,0.3)); }
    }
    .hero-avatar { animation: avatar-kelir 3s ease-in-out infinite; }
  `;
  document.head.appendChild(style);
}

// ============================================
//  13. HERO BORDER FRAME
// ============================================
function initHeroBorderFrame() {
  const hero = document.querySelector(".hero");
  if (!hero) return;
  hero.appendChild(buildHeroBorderFrame());
}

// ============================================
//  14. WAYANG SILHOUETTE di About
// ============================================
function initAboutWayang() {
  const about = document.getElementById("about");
  if (!about) return;
  about.style.position = "relative";
  about.style.overflow = "hidden";
  const sil = buildWayangSilhouette();
  sil.style.cssText += "opacity:.04;right:10px;bottom:0;";
  about.appendChild(sil);
}

// ============================================
//  INIT SEMUA
// ============================================
export function initWayang() {
  initGunungan();
  initBatikParticles();
  initCursorSparks();
  insertParangOrnaments();
  initHeroBorderFrame();
  initScrollProgress();
  initAvatarKelirEffect();
  initAboutWayang();
  insertJavaneseDecoration();

  // Card batik border — jalankan setelah data loaded
  setTimeout(initCardBatikBorder, 2000);

  // Load Noto Serif Javanese untuk aksara Jawa di footer
  const link = document.createElement("link");
  link.rel  = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+Javanese&display=swap";
  document.head.appendChild(link);
}
