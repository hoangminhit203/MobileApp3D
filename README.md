# 🎯 MobileApp3D

<div align="center">
  <img src="./assets/icon/logoInservio.png" alt="MobileApp3D Logo" width="120" height="120">
  
  **Ứng dụng xem và tương tác với mô hình 3D trên di động**
  
  [![React Native](https://img.shields.io/badge/React%20Native-0.79.6-blue.svg)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-~53.0-black.svg)](https://expo.dev/)
  [![Three.js](https://img.shields.io/badge/Three.js-0.180.0-green.svg)](https://threejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
</div>

---

## 📱 Tổng quan

**MobileApp3D** là một ứng dụng di động được xây dựng với React Native và Expo, cho phép người dùng xem, tương tác và học hỏi từ các mô hình 3D. Ứng dụng tích hợp Three.js để render 3D models và cung cấp trải nghiệm tương tác mượt mà.

### ✨ Tính năng chính

- 🎨 **Xem mô hình 3D**: Hiển thị các file GLB/GLTF với chất lượng cao
- 🎮 **Tương tác trực quan**: Xoay, phóng to/thu nhỏ, di chuyển model
- 📚 **Danh mục sản phẩm**: Duyệt qua các category và items
- 🔍 **Tìm kiếm thông minh**: Search theo tên, mã sản phẩm, mô tả
- 📋 **Instructions 3D**: Hướng dẫn tương tác từng bước (đang phát triển)
- 🎯 **Hotspots**: Điểm tương tác trên model 3D
- 📱 **Responsive Design**: Tối ưu cho mọi kích thước màn hình

---

## 🚀 Bắt đầu

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 8.0.0
- **Expo CLI**: >= 6.0.0
- **iOS**: iOS 13.0+ / **Android**: API 21+

### Cài đặt

1. **Clone repository**
   ```bash
   git clone https://github.com/hoangminhit203/MobileApp3D.git
   cd MobileApp3D
   ```

2. **Cài đặt dependencies**
   ```bash
   npm install
   ```

3. **Chạy ứng dụng**
   ```bash
   npm start
   # hoặc
   npx expo start
   ```

4. **Chạy trên thiết bị**
   ```bash
   # iOS
   npm run ios
   
   # Android  
   npm run android
   
   # Web
   npm run web
   ```

---

## 🏗️ Kiến trúc dự án

```
📦 MobileApp3D/
├── 📱 app/                    # App Router (Expo Router v5)
│   ├── (tabs)/               # Tab navigation
│   ├── [catalog]/            # Dynamic catalog routes
│   └── model3d/              # 3D model viewer
├── 🧩 components/            # Reusable components
│   ├── InstructionPanel/     # Instructions UI
│   ├── threeScene/           # 3D scene components
│   └── studio/               # Studio mode
├── 🎨 assets/                # Static assets
│   ├── fonts/                # Custom fonts
│   ├── icon/                 # App icons
│   └── images/               # Images
├── 🔌 api/                   # API services
├── 🎣 hooks/                 # Custom React hooks
├── 📊 Context/               # React Context
├── 🏪 store/                 # State management
├── 🔧 utils/                 # Utility functions
└── 📝 types/                 # TypeScript definitions
```

---

## 💻 Tech Stack

### Frontend Framework
- **React Native**: 0.79.6
- **Expo**: ~53.0.22
- **TypeScript**: Full type safety

### 3D Graphics
- **Three.js**: 0.180.0
- **@react-three/fiber**: React renderer for Three.js
- **@react-three/drei**: Useful helpers for R3F

### Navigation & UI
- **Expo Router**: v5 - File-based routing
- **NativeWind**: Tailwind CSS for React Native
- **Bottom Sheet**: @gorhom/bottom-sheet

### State Management
- **React Context**: Global state management
- **Custom Hooks**: Reusable logic

### Network & Data
- **Axios**: HTTP client
- **RESTful API**: Backend integration

---

## 📚 Cách sử dụng

### 1. Duyệt danh mục
- Vào tab **Home** để xem các category
- Tap vào category để xem sản phẩm

### 2. Xem mô hình 3D
- Chọn một sản phẩm từ danh sách
- Model 3D sẽ load tự động
- Sử dụng gesture để tương tác:
  - **Drag**: Xoay model
  - **Pinch**: Zoom in/out
  - **Pan**: Di chuyển (2 fingers)

### 3. Tìm kiếm
- Vào tab **Search**
- Nhập từ khóa tìm kiếm
- Kết quả hiển thị real-time

---

## 🛠️ API Integration

Ứng dụng kết nối với backend API để lấy dữ liệu:

```typescript
// API endpoints
const API_BASE = 'your-api-url'

// Get categories
GET /api/categories

// Get items by category  
GET /api/categories/{id}/items

// Get 3D model data
GET /api/items/{id}

// Search items
GET /api/search?q={query}
```

### Data Structure
```typescript
interface CatalogItem {
  _id: string
  name: string
  properties: {
    product: {
      instructions: Instructions
      tutorials: Tutorials
      item3D: Item3D
    }
  }
}
```

---

## 🎨 Customization

### Thay đổi theme
```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color'
      }
    }
  }
}
```

### Cấu hình 3D Scene
```typescript
// components/threeScene/threeeScene.tsx
const camera = {
  position: [15, 2, 0],  // Camera position
  fov: 50,               // Field of view
  near: 0.1,             // Near plane
  far: 1000              // Far plane
}
```

---

## 🔧 Scripts

```bash
# Development
npm start              # Start Expo dev server
npm run android        # Run on Android
npm run ios           # Run on iOS
npm run web           # Run on Web

# Maintenance  
npm run lint          # Run ESLint
npm run reset-project # Reset project to initial state
```

---

## 📱 Screenshots

<div align="center">
  <img src="./docs/screenshots/home.png" width="200" alt="Home Screen">
  <img src="./docs/screenshots/3d-model.png" width="200" alt="3D Model">
  <img src="./docs/screenshots/search.png" width="200" alt="Search">
</div>

---

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Mở Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👥 Team

**Developer**: [@hoangminhit203](https://github.com/hoangminhit203)

---

## 🔗 Links

- **Repository**: [GitHub](https://github.com/hoangminhit203/MobileApp3D)
- **Issues**: [GitHub Issues](https://github.com/hoangminhit203/MobileApp3D/issues)
- **Documentation**: [Docs](./docs/)

---

<div align="center">
  <p>Made with ❤️ using React Native & Three.js</p>
  <p>⭐ Star us on GitHub if you like this project!</p>
</div>
# MobileApp3D
# native-studio
