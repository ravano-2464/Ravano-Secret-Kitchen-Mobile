# 📱 Ravano Secret Kitchen Mobile App

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Aplikasi mobile **Ravano Secret Kitchen** yang cantik dan responsif, dibangun dengan React Native dan Expo. Temukan ribuan resep masakan nusantara langsung dari genggaman Anda! 🍳🍲🍰

## ✨ Fitur Utama

- 🏠 **Beranda Interaktif**: Jelajahi resep terbaru dan populer dengan tampilan yang memukau.
- 🔍 **Pencarian Cepat**: Temukan resep favorit Anda dengan mudah.
- 📂 **Kategori Lengkap**: Filter resep berdasarkan kategori (Masakan Utama, Kue, Minuman, dll).
- 📖 **Detail Resep**: Panduan langkah demi langkah, bahan-bahan, dan video tutorial.
- 📱 **Responsif**: Tampilan yang optimal di berbagai ukuran layar HP.

## 🚀 Cara Menjalankan

Pastikan Anda sudah menginstal Node.js dan Expo Go di HP Anda.

1.  **Clone Repository**
    ```bash
    git clone https://github.com/ravano-2464/Ravano-Secret-Kitchen-Mobile.git
    cd mobile
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Konfigurasi Environment**
    Buat file `.env` dan sesuaikan URL API backend Anda:
    ```env
    EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:5000/api
    ```

4.  **Jalankan Aplikasi**
    ```bash
    npx expo start
    ```
    Scan QR code yang muncul dengan aplikasi **Expo Go** (Android) atau **Camera** (iOS).

## 🛠️ Teknologi

- **Framework**: [Expo](https://expo.dev/) & [React Native](https://reactnative.dev/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/)
- **Styling**: `StyleSheet` & Custom Components
- **HTTP Client**: `Axios`
- **Icons**: `Ionicons` (@expo/vector-icons)

---

## 📁 Struktur Proyek

Berikut adalah struktur folder utama aplikasi mobile beserta penjelasannya:

```
Mobile/
├── 📁 app                          # Routing & halaman aplikasi (Expo Router)
│   ├── 📁 (auth)                   # Grup route autentikasi
│   │   ├── 📄 _layout.tsx          # Layout wrapper untuk halaman auth
│   │   ├── 📄 login.tsx            # Halaman login pengguna
│   │   └── 📄 register.tsx         # Halaman registrasi pengguna baru
│   ├── 📁 (tabs)                   # Grup route tab navigasi utama
│   │   ├── 📄 _layout.tsx          # Layout & konfigurasi tab bar
│   │   ├── 📄 index.tsx            # Halaman beranda (Tab Home)
│   │   └── 📄 profile.tsx          # Halaman profil pengguna (Tab Profile)
│   ├── 📁 recipe                   # Route dinamis untuk detail resep
│   │   └── 📄 [id].tsx             # Halaman detail resep berdasarkan ID
│   ├── 📄 +html.tsx                # Kustomisasi HTML untuk platform web
│   ├── 📄 +not-found.tsx           # Halaman 404 (route tidak ditemukan)
│   ├── 📄 _layout.tsx              # Root layout aplikasi (provider global)
│   └── 📄 modal.tsx                # Halaman modal bawaan
├── 📁 assets                       # Aset statis aplikasi
│   ├── 📁 fonts                    # Custom fonts
│   │   └── 📄 SpaceMono-Regular.ttf
│   └── 📁 images                   # Ikon & gambar aplikasi
│       ├── 🖼️ adaptive-icon.png    # Ikon adaptif Android (default)
│       ├── 🖼️ favicon.png          # Favicon untuk platform web (default)
│       ├── 🖼️ icon.png             # Ikon utama aplikasi (default)
│       ├── 🖼️ rsk-adaptive-icon.png # Ikon adaptif Android (RSK)
│       ├── 🖼️ rsk-favicon.png      # Favicon untuk platform web (RSK)
│       ├── 🖼️ rsk-icon.png         # Ikon utama aplikasi (RSK)
│       ├── 🖼️ rsk-splash-icon.png  # Ikon splash screen (RSK)
│       └── 🖼️ splash-icon.png      # Ikon splash screen (default)
├── 📁 components                   # Komponen UI yang dapat digunakan ulang
│   ├── 📁 __tests__                # Unit test untuk komponen
│   │   └── 📄 StyledText-test.js   # Test untuk komponen StyledText
│   ├── 📄 CustomToast.tsx          # Notifikasi toast kustom (swipe-to-dismiss)
│   ├── 📄 EditScreenInfo.tsx       # Komponen informasi edit screen
│   ├── 📄 ExternalLink.tsx         # Komponen link ke URL eksternal
│   ├── 📄 HomeHeader.tsx           # Header beranda dengan search bar & sidebar toggle
│   ├── 📄 LogoutModal.tsx          # Modal konfirmasi logout
│   ├── 📄 RecipeCard.tsx           # Kartu resep untuk ditampilkan di daftar
│   ├── 📄 SearchDialogModal.tsx    # Modal dialog pencarian resep
│   ├── 📄 SettingsModal.tsx        # Modal pengaturan (tema, dll)
│   ├── 📄 Sidebar.tsx              # Navigasi sidebar (drawer)
│   ├── 📄 StyledText.tsx           # Komponen teks dengan styling kustom
│   ├── 📄 Themed.tsx               # Komponen dasar yang mendukung tema (Text, View)
│   ├── 📄 VideoPlayer.tsx          # Pemutar video untuk platform native
│   └── 📄 VideoPlayer.web.tsx      # Pemutar video untuk platform web
├── 📁 constants                    # Konstanta & konfigurasi global
│   └── 📄 Colors.ts               # Definisi palet warna (light & dark theme)
├── 📁 context                      # React Context untuk state global
│   └── 📄 ThemeContext.tsx         # Context provider untuk manajemen tema
├── 📁 hooks                        # Custom React hooks
│   ├── 📄 useClientOnlyValue.ts    # Hook untuk nilai khusus client-side (native)
│   ├── 📄 useClientOnlyValue.web.ts # Hook untuk nilai khusus client-side (web)
│   ├── 📄 useColorScheme.ts        # Hook deteksi skema warna perangkat (native)
│   └── 📄 useColorScheme.web.ts    # Hook deteksi skema warna perangkat (web)
├── 📁 public                       # File publik & screenshot dokumentasi
│   ├── 📁 images                   # Screenshot aplikasi untuk README
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Home-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Login-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Logout-Modal.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Profile-Page.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-How-To-Make.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Ingredients.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Video-Tutorial.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Register-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Sidebar.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Settings-Modal.webp
│   │   └── 🖼️ Ravano-Secret-Kitchen-Search-Dialog-Modal.webp
│   └── 📁 logo                     # Logo aplikasi
│       └── 🖼️ Ravano-Secret-Kitchen-Logo.webp
├── 📁 services                     # Layer komunikasi dengan API backend
│   └── 📄 api.ts                   # Konfigurasi Axios & endpoint API
├── 📁 types                        # Definisi TypeScript types/interfaces
│   └── 📄 Recipe.ts                # Interface untuk data resep
├── ⚙️ .env                         # Environment variables (API URL, dsb.)
├── ⚙️ .gitignore                   # Daftar file/folder yang diabaikan Git
├── 📄 babel.config.js              # Konfigurasi Babel transpiler
├── � expo-env.d.ts                # Deklarasi tipe environment Expo
├── ⚙️ app.json                     # Konfigurasi utama proyek Expo
├── ⚙️ package.json                 # Metadata proyek & daftar dependencies
├── ⚙️ package-lock.json            # Lock file versi dependencies
├── ⚙️ tsconfig.json                # Konfigurasi TypeScript compiler
└── 📝 README.md                    # Dokumentasi proyek ini
```

### 📖 Penjelasan Struktur

| Folder / File | Deskripsi |
|---|---|
| **`app/`** | Folder inti untuk **file-based routing** menggunakan Expo Router. Setiap file `.tsx` di sini otomatis menjadi route/halaman. Grup `(auth)` menangani alur autentikasi, sedangkan `(tabs)` mendefinisikan navigasi tab utama (Home & Profile). Folder `recipe/` menggunakan dynamic route `[id].tsx` untuk menampilkan detail resep berdasarkan ID. |
| **`assets/`** | Menyimpan **aset statis** seperti font kustom (`SpaceMono-Regular.ttf`) dan gambar ikon aplikasi. Gambar dengan prefix `rsk-` adalah ikon bermerek Ravano Secret Kitchen. |
| **`components/`** | Kumpulan **komponen UI reusable** yang digunakan di berbagai halaman. Termasuk `HomeHeader` (header beranda), `RecipeCard` (kartu resep), `Sidebar` (navigasi samping), `SearchDialogModal` (pencarian), `CustomToast` (notifikasi), dan lainnya. File `.web.tsx` menandakan implementasi khusus platform web. |
| **`constants/`** | Menyimpan **nilai konstanta** yang digunakan secara global, seperti `Colors.ts` yang mendefinisikan palet warna untuk tema terang (light) dan gelap (dark). |
| **`context/`** | Berisi **React Context providers** untuk state management global. `ThemeContext.tsx` mengelola tema aplikasi (light/dark mode) agar dapat diakses di seluruh komponen. |
| **`hooks/`** | Kumpulan **custom React hooks** untuk logika yang dapat digunakan ulang. File `.web.ts` menyediakan implementasi alternatif untuk platform web (misalnya deteksi skema warna). |
| **`public/`** | Menyimpan **file publik** berupa screenshot aplikasi (format `.webp`) yang digunakan untuk dokumentasi README, beserta logo resmi aplikasi. |
| **`services/`** | **Service layer** yang menangani komunikasi HTTP dengan API backend. `api.ts` mengkonfigurasi instance Axios dan mendefinisikan base URL dari environment variable. |
| **`types/`** | Berisi **definisi TypeScript types dan interfaces**. `Recipe.ts` mendefinisikan struktur data resep yang digunakan di seluruh aplikasi untuk type safety. |
| **`app.json`** | File konfigurasi utama proyek **Expo**, berisi nama aplikasi, ikon, splash screen, dan pengaturan platform (Android/iOS/Web). |
| **`tsconfig.json`** | Konfigurasi **TypeScript compiler**, termasuk path aliases dan strict mode settings. |
| **`.env`** | File **environment variables** yang menyimpan konfigurasi sensitif seperti URL API backend (`EXPO_PUBLIC_API_URL`). |

---

## 📸 Screenshots

### Login & Register
| Login | Register |
|:---:|:---:|
| ![Login](public/images/Ravano-Secret-Kitchen-Login-Pages.webp) | ![Register](public/images/Ravano-Secret-Kitchen-Register-Pages.webp) |

### Home & Search
| Home | Search Dialog |
|:---:|:---:|
| ![Home](public/images/Ravano-Secret-Kitchen-Home-Pages.webp) | ![Search](public/images/Ravano-Secret-Kitchen-Search-Dialog-Modal.webp) |

### Recipe Detail
| Ingredients | How To Make | Video Tutorial |
|:---:|:---:|:---:|
| ![Ingredients](public/images/Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Ingredients.webp) | ![How To Make](public/images/Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-How-To-Make.webp) | ![Video Tutorial](public/images/Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Video-Tutorial.webp) |

### Profile & Logout
| Profile | Logout Modal | Setting Modal |
|:---:|:---:| :---:|
| ![Profile](public/images/Ravano-Secret-Kitchen-Profile-Page.webp) | ![Logout](public/images/Ravano-Secret-Kitchen-Logout-Modal.webp) | ![Settings](public/images/Ravano-Secret-Kitchen-Settings-Modal.webp) |


### Sidebar
![Sidebar](public/images/Ravano-Secret-Kitchen-Sidebar.webp)

---

**Dibuat dengan ❤️ oleh Ravano Akbar Widodo**
