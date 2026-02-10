# 📱 Rahasia Dapur Mobile App

![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Aplikasi mobile **Rahasia Dapur** yang cantik dan responsif, dibangun dengan React Native dan Expo. Temukan ribuan resep masakan nusantara langsung dari genggaman Anda! 🍳🍲🍰

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
    git clone https://github.com/ravan/rahasia-dapur-mobile.git
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

## 📁 Struktur Proyek

Berikut adalah struktur folder utama aplikasi mobile:

```
mobile/
├── 📁 app/                 # Routing & Screen (Expo Router)
│   ├── 📁 (auth)/          # Authentikasi (Login/Register)
│   │   ├── _layout.tsx
│   │   ├── login.tsx       # Halaman Login
│   │   └── register.tsx    # Halaman Register
│   ├── 📁 (tabs)/          # Navigasi Tab Utama
│   │   ├── _layout.tsx
│   │   └── index.tsx       # Halaman Utama (Home)
│   ├── 📁 recipe/          # Halaman Detail Resep
│   │   └── [id].tsx        # Dynamic Route untuk Detail Resep
│   ├── _layout.tsx         # Layout Root
│   ├── +html.tsx           # Entry point untuk Web
│   ├── +not-found.tsx      # Halaman 404
│   └── modal.tsx           # Layar Modal
├── 📁 assets/              # Gambar & Font
├── 📁 components/          # Komponen UI Reusable
│   ├── __tests__/          # Testing
│   ├── EditScreenInfo.tsx
│   ├── ExternalLink.tsx
│   ├── RecipeCard.tsx      # Komponen Kartu Resep
│   ├── StyledText.tsx
│   ├── Themed.tsx          # Komponen Tema (Light/Dark)
│   ├── VideoPlayer.tsx     # Komponen Video Player
│   └── ...                 # Hooks (useColorScheme, dll)
├── 📁 constants/           # Konstanta Aplikasi
│   └── Colors.ts           # Skema Warna
├── 📁 services/            # Logika API & Jaringan
│   └── api.ts              # Konfigurasi Axios
├── 📁 types/               # Definisi Tipe Data
│   └── Recipe.ts           # Interface Recipe
├── .env                    # Variabel Lingkungan (API URL)
├── app.json                # Konfigurasi Expo
├── babel.config.js
├── package.json            # Dependensi Proyek
└── tsconfig.json           # Konfigurasi TypeScript
```

## �📸 Screenshots

*(Tambahkan screenshot aplikasi di sini)*

---

Dibuat dengan ❤️ oleh **Ravano Ganteng**
