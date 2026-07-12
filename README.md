# Portfolio Firebase

Website portofolio profesional dengan Firebase Firestore + Admin Panel.
Dibangun dengan HTML, CSS, JavaScript murni (Vanilla JS) — tanpa framework.

**Live Demo:** https://zainsv.vercel.app

---

## Fitur

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

## Struktur Folder

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
│   │   ├── firebase-config.js  # Konfigurasi Firebase (EDIT INI)
│   │   ├── app.js              # Logic utama portfolio
│   │   └── admin.js            # Logic admin panel CRUD
│   └── images/
│       ├── profile.jpg     # Foto profil (opsional, bisa pakai URL)
│       └── about.jpg       # Foto about (opsional)
└── data/
    └── sample-data.json    # Contoh data untuk Firestore
```

## Halaman & Sections

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

## Keamanan

- Admin panel hanya bisa diakses setelah login via Firebase Authentication
- Firestore Security Rules memastikan hanya user terautentikasi yang bisa menulis data
- Portfolio publik hanya bisa membaca data, tidak bisa mengubah

---

## Teknologi yang Digunakan

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

## Tips untuk Mahasiswa

1. **Ganti semua placeholder** — Nama, universitas, email, dan semua data contoh
2. **Isi data lewat Admin Panel** — Lebih mudah daripada langsung di Firebase Console
3. **Gunakan URL gambar** — Upload foto ke Imgur atau Cloudinary, lalu tempel URL-nya
4. **Test di HP** — Pastikan tampilan mobile sudah bagus sebelum share ke recruiter
5. **Update rutin** — Tambah proyek dan sertifikat baru secara berkala

---

## Lisensi

Free to use untuk keperluan personal dan pendidikan.
Jangan lupa kasih kredit jika membagikan yaa

---

Dibuat dengan tulus untuk mahasiswa web developer Indonesia.
