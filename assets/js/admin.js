// ============================================
//  admin.js — Admin Panel Logic
// ============================================
import {
  collection, getDocs, doc, getDoc, setDoc, addDoc,
  updateDoc, deleteDoc, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// ---- Toast ----
function toast(msg, type = "info") {
  const icons = { success: "fa-circle-check", error: "fa-circle-xmark", info: "fa-circle-info" };
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa-solid ${icons[type]} ${type}"></i> ${msg}`;
  document.getElementById("toastContainer").appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ---- Confirm Dialog ----
function confirm(msg) {
  return new Promise(resolve => {
    const overlay = document.getElementById("confirmOverlay");
    document.getElementById("confirmMsg").textContent = msg;
    overlay.classList.add("open");
    const ok = document.getElementById("confirmOk");
    const cancel = document.getElementById("confirmCancel");
    const cleanup = (val) => { overlay.classList.remove("open"); ok.replaceWith(ok.cloneNode(true)); cancel.replaceWith(cancel.cloneNode(true)); resolve(val); };
    document.getElementById("confirmOk").addEventListener("click", () => cleanup(true));
    document.getElementById("confirmCancel").addEventListener("click", () => cleanup(false));
  });
}

// ---- Modal helpers ----
function openModal(id) { document.getElementById(id)?.classList.add("open"); }
function closeModal(id) { document.getElementById(id)?.classList.remove("open"); }
document.querySelectorAll("[data-close]").forEach(btn => {
  btn.addEventListener("click", () => closeModal(btn.dataset.close));
});
document.querySelectorAll(".modal-overlay").forEach(el => {
  el.addEventListener("click", e => { if (e.target === el) closeModal(el.id); });
});

// ---- Tab switching ----
function initTabs() {
  const links = document.querySelectorAll(".sidebar-link[data-tab]");
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const tab = link.dataset.tab;
      links.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
      document.getElementById("tab-" + tab)?.classList.add("active");
      document.getElementById("topbarTitle").textContent = link.textContent.trim();
      // Close mobile sidebar
      document.getElementById("sidebar")?.classList.remove("open");
      document.getElementById("sidebarBackdrop")?.classList.remove("open");
      // Load content
      if (tab === "projects") loadProjects();
      if (tab === "skills") loadSkills();
      if (tab === "certificates") loadCertificates();
      if (tab === "experiences") loadExperiences();
      if (tab === "profile") loadProfile();
      if (tab === "contacts") loadContacts();
      if (tab === "dashboard") loadStats();
    });
  });
}

// ---- Mobile Sidebar ----
function initMobileSidebar() {
  const btn = document.getElementById("mobileMenuBtn");
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  btn?.addEventListener("click", () => {
    sidebar?.classList.toggle("open");
    backdrop?.classList.toggle("open");
  });
  backdrop?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("open");
  });
}

// ---- Stats ----
async function loadStats() {
  try {
    const [p, s, c, e] = await Promise.all([
      getDocs(collection(window.db, "projects")),
      getDocs(collection(window.db, "skills")),
      getDocs(collection(window.db, "certificates")),
      getDocs(collection(window.db, "experiences")),
    ]);
    document.getElementById("statProjects").textContent = p.size;
    document.getElementById("statSkills").textContent = s.size;
    document.getElementById("statCerts").textContent = c.size;
    document.getElementById("statExp").textContent = e.size;
  } catch(e) { console.warn("Stats failed:", e); }
}

// ============================================
//  PROJECTS CRUD
// ============================================
async function loadProjects() {
  const list = document.getElementById("projectList");
  list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-spinner fa-spin"></i><p>Memuat...</p></li>`;
  try {
    const snap = await getDocs(query(collection(window.db, "projects"), orderBy("order", "asc")));
    if (snap.empty) { list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-box-open"></i><p>Belum ada proyek.</p></li>`; return; }
    list.innerHTML = "";
    snap.forEach(d => {
      const p = { id: d.id, ...d.data() };
      const li = document.createElement("li");
      li.className = "data-item";
      li.innerHTML = `
        ${p.thumbnail ? `<img class="data-item-thumb" src="${p.thumbnail}" alt="${p.title}" />` : `<div class="data-item-thumb" style="background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:var(--text-dim)"><i class="fa-solid fa-code"></i></div>`}
        <div class="data-item-info">
          <div class="data-item-title">${p.title}</div>
          <div class="data-item-sub">${(p.tech || []).join(", ")}</div>
        </div>
        <div class="data-item-actions">
          <button class="btn btn-outline btn-sm edit-project" data-id="${p.id}"><i class="fa-solid fa-pen"></i> <span>Edit</span></button>
          <button class="btn btn-danger btn-sm del-project" data-id="${p.id}" data-title="${p.title}"><i class="fa-solid fa-trash"></i> <span>Hapus</span></button>
        </div>`;
      list.appendChild(li);
    });
    list.querySelectorAll(".edit-project").forEach(btn => btn.addEventListener("click", () => editProject(btn.dataset.id)));
    list.querySelectorAll(".del-project").forEach(btn => btn.addEventListener("click", async () => {
      if (await confirm(`Hapus proyek "${btn.dataset.title}"?`)) {
        await deleteDoc(doc(window.db, "projects", btn.dataset.id));
        toast("Proyek dihapus", "success"); loadProjects();
      }
    }));
  } catch(e) { list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-circle-exclamation"></i><p>Gagal memuat.</p></li>`; }
}

async function editProject(id) {
  const snap = await getDoc(doc(window.db, "projects", id));
  const p = snap.data();
  document.getElementById("projectId").value = id;
  document.getElementById("projectModalTitle").textContent = "Edit Proyek";
  document.getElementById("projectTitle").value = p.title || "";
  document.getElementById("projectDesc").value = p.description || "";
  document.getElementById("projectTech").value = (p.tech || []).join(", ");
  document.getElementById("projectGithub").value = p.github || "";
  document.getElementById("projectDemo").value = p.demo || "";
  document.getElementById("projectThumb").value = p.thumbnail || "";
  document.getElementById("projectOrder").value = p.order || 0;
  openModal("projectModal");
}

document.getElementById("addProjectBtn")?.addEventListener("click", () => {
  document.getElementById("projectId").value = "";
  document.getElementById("projectModalTitle").textContent = "Tambah Proyek";
  ["projectTitle","projectDesc","projectTech","projectGithub","projectDemo","projectThumb"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("projectOrder").value = "0";
  openModal("projectModal");
});

document.getElementById("saveProjectBtn")?.addEventListener("click", async () => {
  const title = document.getElementById("projectTitle").value.trim();
  if (!title) { toast("Nama proyek wajib diisi", "error"); return; }
  const data = {
    title,
    description: document.getElementById("projectDesc").value.trim(),
    tech: document.getElementById("projectTech").value.split(",").map(t=>t.trim()).filter(Boolean),
    github: document.getElementById("projectGithub").value.trim(),
    demo: document.getElementById("projectDemo").value.trim(),
    thumbnail: document.getElementById("projectThumb").value.trim(),
    order: parseInt(document.getElementById("projectOrder").value) || 0,
    updatedAt: new Date()
  };
  const id = document.getElementById("projectId").value;
  try {
    if (id) await updateDoc(doc(window.db, "projects", id), data);
    else     await addDoc(collection(window.db, "projects"), { ...data, createdAt: new Date() });
    toast(id ? "Proyek diperbarui" : "Proyek ditambahkan", "success");
    closeModal("projectModal"); loadProjects();
  } catch(e) { toast("Gagal menyimpan: " + e.message, "error"); }
});

// ============================================
//  SKILLS CRUD
// ============================================
async function loadSkills() {
  const list = document.getElementById("skillList");
  list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-spinner fa-spin"></i><p>Memuat...</p></li>`;
  try {
    const snap = await getDocs(query(collection(window.db, "skills"), orderBy("order", "asc")));
    if (snap.empty) { list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-box-open"></i><p>Belum ada skill.</p></li>`; return; }
    list.innerHTML = "";
    snap.forEach(d => {
      const s = { id: d.id, ...d.data() };
      const li = document.createElement("li"); li.className = "data-item";
      li.innerHTML = `
        <img class="data-item-thumb" style="width:40px;height:40px;object-fit:contain;background:var(--surface-2);padding:6px;border-radius:8px" src="${s.logoUrl || `https://skillicons.dev/icons?i=${s.name.toLowerCase()}`}" alt="${s.name}" onerror="this.src='https://via.placeholder.com/40x40/1E293B/94A3B8?text=${s.name[0]}'" />
        <div class="data-item-info">
          <div class="data-item-title">${s.name}</div>
          <div class="data-item-sub">${s.level || 80}% penguasaan</div>
        </div>
        <div class="data-item-actions">
          <button class="btn btn-outline btn-sm edit-skill" data-id="${s.id}"><i class="fa-solid fa-pen"></i> <span>Edit</span></button>
          <button class="btn btn-danger btn-sm del-skill" data-id="${s.id}" data-name="${s.name}"><i class="fa-solid fa-trash"></i> <span>Hapus</span></button>
        </div>`;
      list.appendChild(li);
    });
    list.querySelectorAll(".edit-skill").forEach(btn => btn.addEventListener("click", () => editSkill(btn.dataset.id)));
    list.querySelectorAll(".del-skill").forEach(btn => btn.addEventListener("click", async () => {
      if (await confirm(`Hapus skill "${btn.dataset.name}"?`)) {
        await deleteDoc(doc(window.db, "skills", btn.dataset.id));
        toast("Skill dihapus", "success"); loadSkills();
      }
    }));
  } catch(e) { list.innerHTML = `<li class="empty-list"><p>Gagal memuat.</p></li>`; }
}

async function editSkill(id) {
  const snap = await getDoc(doc(window.db, "skills", id));
  const s = snap.data();
  document.getElementById("skillId").value = id;
  document.getElementById("skillModalTitle").textContent = "Edit Skill";
  document.getElementById("skillName").value = s.name || "";
  document.getElementById("skillLogo").value = s.logoUrl || "";
  document.getElementById("skillLevel").value = s.level || 80;
  document.getElementById("skillLevelVal").textContent = s.level || 80;
  document.getElementById("skillOrder").value = s.order || 0;
  openModal("skillModal");
}

document.getElementById("skillLevel")?.addEventListener("input", (e) => {
  document.getElementById("skillLevelVal").textContent = e.target.value;
});

document.getElementById("addSkillBtn")?.addEventListener("click", () => {
  document.getElementById("skillId").value = "";
  document.getElementById("skillModalTitle").textContent = "Tambah Skill";
  document.getElementById("skillName").value = "";
  document.getElementById("skillLogo").value = "";
  document.getElementById("skillLevel").value = 80;
  document.getElementById("skillLevelVal").textContent = "80";
  document.getElementById("skillOrder").value = "0";
  openModal("skillModal");
});

document.getElementById("saveSkillBtn")?.addEventListener("click", async () => {
  const name = document.getElementById("skillName").value.trim();
  if (!name) { toast("Nama skill wajib diisi", "error"); return; }
  const data = {
    name,
    logoUrl: document.getElementById("skillLogo").value.trim(),
    level: parseInt(document.getElementById("skillLevel").value),
    order: parseInt(document.getElementById("skillOrder").value) || 0,
    updatedAt: new Date()
  };
  const id = document.getElementById("skillId").value;
  try {
    if (id) await updateDoc(doc(window.db, "skills", id), data);
    else     await addDoc(collection(window.db, "skills"), { ...data, createdAt: new Date() });
    toast(id ? "Skill diperbarui" : "Skill ditambahkan", "success");
    closeModal("skillModal"); loadSkills();
  } catch(e) { toast("Gagal: " + e.message, "error"); }
});

// ============================================
//  CERTIFICATES CRUD
// ============================================
async function loadCertificates() {
  const list = document.getElementById("certList");
  list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-spinner fa-spin"></i><p>Memuat...</p></li>`;
  try {
    const snap = await getDocs(query(collection(window.db, "certificates"), orderBy("year", "desc")));
    if (snap.empty) { list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-box-open"></i><p>Belum ada sertifikat.</p></li>`; return; }
    list.innerHTML = "";
    snap.forEach(d => {
      const c = { id: d.id, ...d.data() };
      const li = document.createElement("li"); li.className = "data-item";
      li.innerHTML = `
        ${c.imageUrl ? `<img class="data-item-thumb" src="${c.imageUrl}" alt="${c.title}" />` : `<div class="data-item-thumb" style="background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:var(--text-dim)"><i class="fa-solid fa-certificate"></i></div>`}
        <div class="data-item-info">
          <div class="data-item-title">${c.title}</div>
          <div class="data-item-sub">${c.issuer || ""} · ${c.year || ""}</div>
        </div>
        <div class="data-item-actions">
          <button class="btn btn-outline btn-sm edit-cert" data-id="${c.id}"><i class="fa-solid fa-pen"></i> <span>Edit</span></button>
          <button class="btn btn-danger btn-sm del-cert" data-id="${c.id}" data-title="${c.title}"><i class="fa-solid fa-trash"></i> <span>Hapus</span></button>
        </div>`;
      list.appendChild(li);
    });
    list.querySelectorAll(".edit-cert").forEach(btn => btn.addEventListener("click", () => editCert(btn.dataset.id)));
    list.querySelectorAll(".del-cert").forEach(btn => btn.addEventListener("click", async () => {
      if (await confirm(`Hapus sertifikat "${btn.dataset.title}"?`)) {
        await deleteDoc(doc(window.db, "certificates", btn.dataset.id));
        toast("Sertifikat dihapus", "success"); loadCertificates();
      }
    }));
  } catch(e) { list.innerHTML = `<li class="empty-list"><p>Gagal memuat.</p></li>`; }
}

async function editCert(id) {
  const snap = await getDoc(doc(window.db, "certificates", id));
  const c = snap.data();
  document.getElementById("certId").value = id;
  document.getElementById("certModalTitle").textContent = "Edit Sertifikat";
  document.getElementById("certTitle").value = c.title || "";
  document.getElementById("certIssuer").value = c.issuer || "";
  document.getElementById("certYear").value = c.year || "";
  document.getElementById("certImage").value = c.imageUrl || "";
  document.getElementById("certCredUrl").value = c.credentialUrl || "";
  openModal("certModal");
}

document.getElementById("addCertBtn")?.addEventListener("click", () => {
  document.getElementById("certId").value = "";
  document.getElementById("certModalTitle").textContent = "Tambah Sertifikat";
  ["certTitle","certIssuer","certYear","certImage","certCredUrl"].forEach(id => document.getElementById(id).value = "");
  openModal("certModal");
});

document.getElementById("saveCertBtn")?.addEventListener("click", async () => {
  const title = document.getElementById("certTitle").value.trim();
  if (!title) { toast("Nama sertifikat wajib diisi", "error"); return; }
  const data = {
    title,
    issuer: document.getElementById("certIssuer").value.trim(),
    year: document.getElementById("certYear").value.trim(),
    imageUrl: document.getElementById("certImage").value.trim(),
    credentialUrl: document.getElementById("certCredUrl").value.trim(),
    updatedAt: new Date()
  };
  const id = document.getElementById("certId").value;
  try {
    if (id) await updateDoc(doc(window.db, "certificates", id), data);
    else     await addDoc(collection(window.db, "certificates"), { ...data, createdAt: new Date() });
    toast(id ? "Sertifikat diperbarui" : "Sertifikat ditambahkan", "success");
    closeModal("certModal"); loadCertificates();
  } catch(e) { toast("Gagal: " + e.message, "error"); }
});

// ============================================
//  EXPERIENCES CRUD
// ============================================
async function loadExperiences() {
  const list = document.getElementById("expList");
  list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-spinner fa-spin"></i><p>Memuat...</p></li>`;
  try {
    const snap = await getDocs(query(collection(window.db, "experiences"), orderBy("startDate", "desc")));
    if (snap.empty) { list.innerHTML = `<li class="empty-list"><i class="fa-solid fa-box-open"></i><p>Belum ada pengalaman.</p></li>`; return; }
    list.innerHTML = "";
    snap.forEach(d => {
      const exp = { id: d.id, ...d.data() };
      const li = document.createElement("li"); li.className = "data-item";
      li.innerHTML = `
        <div class="data-item-thumb" style="background:var(--surface-2);display:flex;align-items:center;justify-content:center;color:var(--accent);font-size:1.2rem"><i class="fa-solid fa-timeline"></i></div>
        <div class="data-item-info">
          <div class="data-item-title">${exp.role || exp.title}</div>
          <div class="data-item-sub">${exp.organization} · ${exp.startDate || ""}${exp.endDate?" – "+exp.endDate:""}</div>
        </div>
        <div class="data-item-actions">
          <button class="btn btn-outline btn-sm edit-exp" data-id="${exp.id}"><i class="fa-solid fa-pen"></i> <span>Edit</span></button>
          <button class="btn btn-danger btn-sm del-exp" data-id="${exp.id}" data-role="${exp.role}"><i class="fa-solid fa-trash"></i> <span>Hapus</span></button>
        </div>`;
      list.appendChild(li);
    });
    list.querySelectorAll(".edit-exp").forEach(btn => btn.addEventListener("click", () => editExp(btn.dataset.id)));
    list.querySelectorAll(".del-exp").forEach(btn => btn.addEventListener("click", async () => {
      if (await confirm(`Hapus pengalaman "${btn.dataset.role}"?`)) {
        await deleteDoc(doc(window.db, "experiences", btn.dataset.id));
        toast("Pengalaman dihapus", "success"); loadExperiences();
      }
    }));
  } catch(e) { list.innerHTML = `<li class="empty-list"><p>Gagal memuat.</p></li>`; }
}

async function editExp(id) {
  const snap = await getDoc(doc(window.db, "experiences", id));
  const e = snap.data();
  document.getElementById("expId").value = id;
  document.getElementById("expModalTitle").textContent = "Edit Pengalaman";
  document.getElementById("expRole").value = e.role || "";
  document.getElementById("expOrg").value = e.organization || "";
  document.getElementById("expType").value = e.type || "org";
  document.getElementById("expStart").value = e.startDate || "";
  document.getElementById("expEnd").value = e.endDate || "";
  document.getElementById("expDesc").value = e.description || "";
  openModal("expModal");
}

document.getElementById("addExpBtn")?.addEventListener("click", () => {
  document.getElementById("expId").value = "";
  document.getElementById("expModalTitle").textContent = "Tambah Pengalaman";
  ["expRole","expOrg","expStart","expEnd","expDesc"].forEach(id => document.getElementById(id).value = "");
  document.getElementById("expType").value = "org";
  openModal("expModal");
});

document.getElementById("saveExpBtn")?.addEventListener("click", async () => {
  const role = document.getElementById("expRole").value.trim();
  const org  = document.getElementById("expOrg").value.trim();
  if (!role || !org) { toast("Posisi dan Organisasi wajib diisi", "error"); return; }
  const data = {
    role, organization: org,
    type: document.getElementById("expType").value,
    startDate: document.getElementById("expStart").value.trim(),
    endDate: document.getElementById("expEnd").value.trim(),
    description: document.getElementById("expDesc").value.trim(),
    updatedAt: new Date()
  };
  const id = document.getElementById("expId").value;
  try {
    if (id) await updateDoc(doc(window.db, "experiences", id), data);
    else     await addDoc(collection(window.db, "experiences"), { ...data, createdAt: new Date() });
    toast(id ? "Pengalaman diperbarui" : "Pengalaman ditambahkan", "success");
    closeModal("expModal"); loadExperiences();
  } catch(e) { toast("Gagal: " + e.message, "error"); }
});

// ============================================
//  PROFILE & CONTACTS
// ============================================
async function loadProfile() {
  try {
    const snap = await getDoc(doc(window.db, "profile", "main"));
    if (!snap.exists()) return;
    const d = snap.data();
    document.getElementById("pName").value       = d.name || "";
    document.getElementById("pUniversity").value = d.university || "";
    document.getElementById("pMajor").value      = d.major || "";
    document.getElementById("pYear").value       = d.year || "";
    document.getElementById("pLocation").value   = d.location || "";
    document.getElementById("pCvUrl").value      = d.cvUrl || "";
    document.getElementById("pAvatarUrl").value  = d.avatarUrl || "";
    document.getElementById("pAboutAvatar").value= d.aboutAvatar || "";
    document.getElementById("pDescription").value= d.description || "";
    document.getElementById("pAboutText").value  = d.aboutText || "";
    document.getElementById("pInterests").value  = (d.interests || []).join(", ");
  } catch(e) { toast("Gagal memuat profil", "error"); }
}

document.getElementById("saveProfileBtn")?.addEventListener("click", async () => {
  const data = {
    name:        document.getElementById("pName").value.trim(),
    university:  document.getElementById("pUniversity").value.trim(),
    major:       document.getElementById("pMajor").value.trim(),
    year:        document.getElementById("pYear").value.trim(),
    location:    document.getElementById("pLocation").value.trim(),
    cvUrl:       document.getElementById("pCvUrl").value.trim(),
    avatarUrl:   document.getElementById("pAvatarUrl").value.trim(),
    aboutAvatar: document.getElementById("pAboutAvatar").value.trim(),
    description: document.getElementById("pDescription").value.trim(),
    aboutText:   document.getElementById("pAboutText").value.trim(),
    interests:   document.getElementById("pInterests").value.split(",").map(t=>t.trim()).filter(Boolean),
    updatedAt:   new Date()
  };
  try {
    await setDoc(doc(window.db, "profile", "main"), data, { merge: true });
    toast("Profil disimpan", "success");
  } catch(e) { toast("Gagal: " + e.message, "error"); }
});

async function loadContacts() {
  try {
    const snap = await getDoc(doc(window.db, "contacts", "main"));
    if (!snap.exists()) return;
    const d = snap.data();
    document.getElementById("cEmail").value    = d.email || "";
    document.getElementById("cWhatsapp").value = d.whatsapp || "";
    document.getElementById("cGithub").value   = d.github || "";
    document.getElementById("cLinkedin").value = d.linkedin || "";
    document.getElementById("cInstagram").value= d.instagram || "";
  } catch(e) { toast("Gagal memuat kontak", "error"); }
}

document.getElementById("saveContactBtn")?.addEventListener("click", async () => {
  const data = {
    email:     document.getElementById("cEmail").value.trim(),
    whatsapp:  document.getElementById("cWhatsapp").value.trim(),
    github:    document.getElementById("cGithub").value.trim(),
    linkedin:  document.getElementById("cLinkedin").value.trim(),
    instagram: document.getElementById("cInstagram").value.trim(),
    updatedAt: new Date()
  };
  try {
    await setDoc(doc(window.db, "contacts", "main"), data, { merge: true });
    toast("Kontak disimpan", "success");
  } catch(e) { toast("Gagal: " + e.message, "error"); }
});

// ============================================
//  AUTH
// ============================================
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const pass  = document.getElementById("loginPassword").value;
  const errEl = document.getElementById("loginError");
  const btnText = document.getElementById("loginBtnText");
  errEl.textContent = "";
  if (!email || !pass) { errEl.textContent = "Email dan password wajib diisi."; return; }
  btnText.innerHTML = `<span class="spinner"></span> Masuk...`;
  try {
    await signInWithEmailAndPassword(window.auth, email, pass);
  } catch(e) {
    btnText.textContent = "Masuk";
    const msgs = { "auth/user-not-found": "Email tidak ditemukan.", "auth/wrong-password": "Password salah.", "auth/invalid-email": "Format email tidak valid.", "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi nanti." };
    errEl.textContent = msgs[e.code] || "Login gagal: " + e.message;
  }
});

document.getElementById("loginPassword")?.addEventListener("keydown", e => {
  if (e.key === "Enter") document.getElementById("loginBtn")?.click();
});

document.getElementById("logoutBtn")?.addEventListener("click", async () => {
  await signOut(window.auth);
});

// ============================================
//  INIT
// ============================================
export function initAdmin() {
  onAuthStateChanged(window.auth, user => {
    if (user) {
      document.getElementById("loginPage").style.display  = "none";
      document.getElementById("adminLayout").style.display = "flex";
      document.getElementById("sidebarUser").textContent   = user.email;
      document.getElementById("topbarEmail").textContent   = user.email;
      initTabs();
      initMobileSidebar();
      loadStats();
    } else {
      document.getElementById("loginPage").style.display  = "flex";
      document.getElementById("adminLayout").style.display = "none";
      document.getElementById("loginBtnText").textContent  = "Masuk";
    }
  });
}
