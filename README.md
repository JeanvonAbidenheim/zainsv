# 🚀 Portfolio Firebase

Website portofolio profesional dengan Firebase Firestore + Admin Panel.
Dibangun dengan HTML, CSS, JavaScript murni (Vanilla JS) — tanpa framework.

**Live Demo:** Setelah deploy ke Vercel, link akan tersedia di sini.

---

## ✨ Fitur

- **Desain Modern** — Dark mode, gradient, animasi scroll reveal, particle background
- **Typing Effect** — Teks peran berubah otomatis di hero section
- **Skill Cards** — Animasi progress bar saat scroll
- **Filter Proyek** — Filter berdasarkan teknologi
- **Timeline Pengalaman** — Tampilan timeline modern
- **Sertifikat** — Dengan modal preview gambar
- **Admin Panel** — CRUD lengkap untuk semua konten
- **Firebase Auth** — Login admin yang aman
- **Responsive** — Mobile-friendly di semua ukuran layar
- **Demo Mode** — Tampil data demo otomatis jika Firebase belum dikonfigurasi

---

## 📁 Struktur Folder

```
portfolio-firebase/
├── index.html              # Halaman utama portfolio
├── admin.html              # Panel admin (login + CRUD)
├── vercel.json             # Konfigurasi Vercel
├── assets/
│   ├── css/
│   │   ├── style.css       # Stylesheet utama
│   │   ├── admin.css       # Stylesheet admin panel
│   │   └── responsive.css  # Responsive/media queries
│   ├── js/
│   │   ├── firebase-config.js  # ⚙️ Konfigurasi Firebase (EDIT INI)
│   │   ├── app.js              # Logic utama portfolio
│   │   └── admin.js            # Logic admin panel CRUD
│   └── images/
│       ├── profile.jpg     # Foto profil (opsional, bisa pakai URL)
│       └── about.jpg       # Foto about (opsional)
└── data/
    └── sample-data.json    # Contoh data untuk Firestore
```

---

## ⚙️ Setup Firebase

### 1. Buat Project Firebase

1. Buka [console.firebase.google.com](https://console.firebase.google.com)
2. Klik **Add project** → beri nama → klik **Continue**
3. Nonaktifkan Google Analytics (opsional) → **Create project**

### 2. Aktifkan Firestore

1. Di sidebar kiri, klik **Firestore Database**
2. Klik **Create database**
3. Pilih **Start in test mode** (untuk development)
4. Pilih region terdekat (misal: `asia-southeast1`)
5. Klik **Enable**

### 3. Aktifkan Authentication

1. Di sidebar kiri, klik **Authentication**
2. Klik **Get started**
3. Tab **Sign-in method** → aktifkan **Email/Password**
4. Tab **Users** → klik **Add user**
5. Isi email dan password kamu → **Add user**
   > ⚠️ Email & password ini yang kamu pakai untuk login ke `/admin.html`

### 4. Salin Konfigurasi Firebase

1. Klik ikon ⚙️ → **Project settings**
2. Scroll ke bawah → bagian **Your apps**
3. Klik ikon `</>` (Web app) → daftarkan app
4. Salin nilai `firebaseConfig`
5. Buka file `assets/js/firebase-config.js` dan tempel:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "nama-project.firebaseapp.com",
  projectId:         "nama-project",
  storageBucket:     "nama-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### 5. Atur Security Rules Firestore

Di Firestore → **Rules**, tempel ini:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Semua orang bisa baca (untuk portfolio publik)
    match /{document=**} {
      allow read: if true;
    }
    // Hanya user yang sudah login (admin) yang bisa tulis
    match /{document=**} {
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📊 Isi Data ke Firestore

### Cara 1: Lewat Admin Panel (Direkomendasikan)

1. Buka `admin.html`
2. Login dengan email & password yang sudah didaftarkan
3. Isi data melalui form yang tersedia

### Cara 2: Lewat Firebase Console

1. Buka Firestore Database → **Start collection**
2. Buat collection sesuai nama berikut:

| Collection | Document ID | Keterangan |
|---|---|---|
| `profile` | `main` | Data profil & about |
| `contacts` | `main` | Email, WA, GitHub, dst |
| `skills` | *(auto)* | Skill & teknologi |
| `projects` | *(auto)* | Proyek portfolio |
| `certificates` | *(auto)* | Sertifikat |
| `experiences` | *(auto)* | Pengalaman & organisasi |
| `work` | *(auto)* | Pengalaman kerja / magang / freelance |

Lihat `data/sample-data.json` untuk contoh struktur data lengkap.

---

## 🌐 Deploy ke Vercel

### Cara 1: Via GitHub (Direkomendasikan)

1. Upload folder ini ke GitHub repository baru
2. Buka [vercel.com](https://vercel.com) → Sign in with GitHub
3. Klik **New Project** → Import repository kamu
4. Biarkan semua setting default → Klik **Deploy**
5. Selesai! Website langsung online 🎉

### Cara 2: Via Vercel CLI

```bash
npm install -g vercel
cd portfolio-firebase
vercel
```

---

## 🛠️ Kustomisasi

### Ganti Warna Tema

Edit variabel di `assets/css/style.css` bagian `:root`:

```css
:root {
  --primary:  #2563EB;  /* Warna utama (biru) */
  --accent:   #06B6D4;  /* Warna aksen (cyan) */
  --bg:       #0F172A;  /* Warna background */
}
```

### Ganti Foto Profil

**Opsi A — Upload ke hosting (Imgur, Cloudinary, dll):**
- Upload foto → salin URL → isi di Admin Panel → field "URL Foto Profil"

**Opsi B — Taruh di folder:**
- Taruh `profile.jpg` di `assets/images/`
- Foto akan otomatis tampil

### Tambah Peran di Typing Effect

Edit array `ROLES` di `assets/js/app.js`:

```javascript
const ROLES = [
  "Web Developer",
  "UI/UX Enthusiast",
  "Nama Peran Lainnya",  // ← tambah di sini
];
```

---

## 📱 Halaman & Sections

| Section | Sumber Data |
|---|---|
| Hero | `profile` (Firestore) |
| Tentang Saya | `profile` (Firestore) |
| Skill & Teknologi | `skills` (Firestore) |
| Portfolio Proyek | `projects` (Firestore) |
| Sertifikat | `certificates` (Firestore) |
| Pengalaman | `experiences` (Firestore) |
| Pengalaman Kerja | `work` (Firestore) |
| Kontak | `contacts` (Firestore) |

---

## 🔒 Keamanan

- Admin panel hanya bisa diakses setelah login via Firebase Authentication
- Firestore Security Rules memastikan hanya user terautentikasi yang bisa menulis data
- Portfolio publik hanya bisa membaca data, tidak bisa mengubah

---

## 🧩 Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur halaman |
| CSS3 | Styling & animasi |
| JavaScript ES6+ | Logika & interaksi |
| Firebase Firestore | Database online |
| Firebase Auth | Autentikasi admin |
| Vercel | Hosting & deployment |
| Font Awesome 6 | Ikon |
| Google Fonts | Tipografi (Poppins & Inter) |

---

## 💡 Tips untuk Mahasiswa

1. **Ganti semua placeholder** — Nama, universitas, email, dan semua data contoh
2. **Isi data lewat Admin Panel** — Lebih mudah daripada langsung di Firebase Console
3. **Gunakan URL gambar** — Upload foto ke Imgur atau Cloudinary, lalu tempel URL-nya
4. **Test di HP** — Pastikan tampilan mobile sudah bagus sebelum share ke recruiter
5. **Update rutin** — Tambah proyek dan sertifikat baru secara berkala

---

## 📄 Lisensi

Free to use untuk keperluan personal dan pendidikan.
Jangan lupa kasih kredit jika membagikan 🙏

---

Dibuat dengan ♥ untuk mahasiswa web developer Indonesia.
