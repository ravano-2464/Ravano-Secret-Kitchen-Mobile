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

Berikut adalah struktur folder utama aplikasi mobile:
```
├── 📁 .qodo
│   ├── 📁 agents
│   └── 📁 workflows
├── 📁 app
│   ├── 📁 (auth)
│   │   ├── 📄 _layout.tsx
│   │   ├── 📄 login.tsx
│   │   └── 📄 register.tsx
│   ├── 📁 (tabs)
│   │   ├── 📄 _layout.tsx
│   │   ├── 📄 index.tsx
│   │   └── 📄 profile.tsx
│   ├── 📁 recipe
│   │   └── 📄 [id].tsx
│   ├── 📄 +html.tsx
│   ├── 📄 +not-found.tsx
│   ├── 📄 _layout.tsx
│   └── 📄 modal.tsx
├── 📁 assets
│   ├── 📁 fonts
│   │   └── 📄 SpaceMono-Regular.ttf
│   └── 📁 images
│       ├── 🖼️ adaptive-icon.png
│       ├── 🖼️ favicon.png
│       ├── 🖼️ icon.png
│       ├── 🖼️ rsk-adaptive-icon.png
│       ├── 🖼️ rsk-favicon.png
│       ├── 🖼️ rsk-icon.png
│       ├── 🖼️ rsk-splash-icon.png
│       └── 🖼️ splash-icon.png
├── 📁 components
│   ├── 📁 __tests__
│   │   └── 📄 StyledText-test.js
│   ├── 📄 CustomToast.tsx
│   ├── 📄 EditScreenInfo.tsx
│   ├── 📄 ExternalLink.tsx
│   ├── 📄 HomeHeader.tsx
│   ├── 📄 LogoutModal.tsx
│   ├── 📄 RecipeCard.tsx
│   ├── 📄 SearchDialogModal.tsx
│   ├── 📄 SettingsModal.tsx
│   ├── 📄 Sidebar.tsx
│   ├── 📄 StyledText.tsx
│   ├── 📄 Themed.tsx
│   ├── 📄 VideoPlayer.tsx
│   └── 📄 VideoPlayer.web.tsx
├── 📁 constants
│   └── 📄 Colors.ts
├── 📁 context
│   └── 📄 ThemeContext.tsx
├── 📁 hooks
│   ├── 📄 useClientOnlyValue.ts
│   ├── 📄 useClientOnlyValue.web.ts
│   ├── 📄 useColorScheme.ts
│   └── 📄 useColorScheme.web.ts
├── 📁 public
│   ├── 📁 images
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Home-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Login-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Logout-Modal.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Profile-Page.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-How-To-Make.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Ingredients.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Recipe-Detail-Pages-Tabs-Video-Tutorial.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Register-Pages.webp
│   │   ├── 🖼️ Ravano-Secret-Kitchen-Sidebarwebp
│   │   └── 🖼️ Ravano-Secret-Kitchen-Search-Dialog-Modal.webp
│   └── 📁 logo
│       └── 🖼️ Ravano-Secret-Kitchen-Logo.webp
├── 📁 services
│   └── 📄 api.ts
├── 📁 types
│   └── 📄 Recipe.ts
├── ⚙️ .gitignore
├── 📝 README.md
├── ⚙️ app.json
├── 📄 babel.config.js
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── ⚙️ tsconfig.json
```

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
| Profile | Logout Modal |
|:---:|:---:|
| ![Profile](public/images/Ravano-Secret-Kitchen-Profile-Page.webp) | ![Logout](public/images/Ravano-Secret-Kitchen-Logout-Modal.webp) |

### Sidebar
![Sidebar](public/images/Ravano-Secret-Kitchen-Sidebar.webp)

---

**Dibuat dengan ❤️ oleh Ravano Akbar Widodo**
