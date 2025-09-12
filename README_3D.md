# 3D Model Viewer - Mobile App

Ứng dụng hiển thị 3D model từ API với React Three Fiber trên React Native/Expo.

## 🚀 Tính năng chính

- ✅ Hiển thị 3D model fullscreen
- ✅ Orbit controls (xoay, zoom, pan)
- ✅ Fetch model từ API theo product ID
- ✅ Navigation từ product detail → 3D viewer
- ✅ Error handling cho EXGL issues
- ✅ Loading states

## 📁 Cấu trúc Files

### Core Components
```
components/
├── Model3DViewer.tsx          # Main fullscreen 3D viewer
├── threeScene/
│   └── threeScene.tsx         # React Three Fiber scene
└── ThreeSceneErrorBoundary.tsx # Error boundary cho 3D scene
```

### App Pages  
```
app/
├── model3d/
│   ├── [id].tsx               # Route: /model3d/{productId}
│   └── page.tsx               # Route: /model3d/page?id={productId}
└── [catalog]/
    └── [id].tsx               # Product detail với "View 3D Model" button
```

### API & Hooks
```
api/
└── apiClient.ts               # fetchItemById() function

hooks/
└── use3DModel.ts              # Hook fetch 3D model data từ API
```

### Utils
```
utils/
└── webglFixes.ts              # Fix lỗi EXGL multisampling
```

## 🎯 User Flow

```
Product Catalog → Product Detail → Click "View 3D Model" → 3D Viewer (Fullscreen)
                                                         ↓
                                                      Back Button
```

## 🔧 Cách sử dụng

### 1. Navigate đến 3D viewer
```tsx
import { router } from 'expo-router';

// Từ product detail page
const handleView3D = (productId: string) => {
  router.push(`/model3d/page?id=${productId}`);
  // hoặc: router.push(`/model3d/${productId}`);
};
```

### 2. Sử dụng component trực tiếp
```tsx
import Model3DViewer from '@/components/Model3DViewer';

<Model3DViewer 
  itemId="65e61c82febf489dbec9c206" 
  enableDebug={__DEV__} 
/>
```

## 📊 API Data Structure

3D model được tìm trong order ưu tiên:
```json
{
  "_id": "productId",
  "properties": {
    "product": {
      "instructions": {
        "multiActions": {
          "files": {
            "glb": "https://example.com/model.glb"  // ← Ưu tiên 1
          }
        }
      },
      "tutorials": {
        "files": {
          "glb": "https://example.com/model.glb"    // ← Ưu tiên 2
        }
      }
    }
  }
}
```

## 🛠️ Development

### Start server
```bash
npx expo start --port 3000
```

### Debug mode
```tsx
// Enable debug logging trong development
<Model3DViewer itemId="..." enableDebug={__DEV__} />
```

### Test với product ID thực
```tsx
const testId = "65e61c82febf489dbec9c206"; // Boat model example
```

## ⚡ Performance & Fixes

### EXGL Error Fixes
- `webglFixes.ts` - Suppress console errors
- Canvas config với `antialias: false`
- Error boundary để catch 3D rendering errors

### Optimizations
- `frameloop="demand"` - Chỉ render khi cần
- Suspense cho model loading
- Minimal WebGL context để tránh crashes

## 🎨 UI/UX

### Model3DViewer
- **Fullscreen**: Toàn màn hình đen
- **Back button**: Góc trên bên trái (white icon + dark background)
- **Touch controls**: Orbit, zoom, pan tự động

### Error States
- Loading spinner khi fetch API
- Error message khi không tìm thấy model
- Fallback UI cho network issues

## 🔍 Troubleshooting

### Lỗi thường gặp:
1. **"EXGL: renderbufferStorageMultisample() isn't implemented yet!"**
   - ✅ Đã fix bằng webglFixes.ts

2. **"No GLB URL found"**
   - Kiểm tra API response structure
   - Verify product có file 3D không

3. **3D model không hiển thị**
   - Check network connection
   - Verify GLB file URL accessible
   - Enable debug mode để xem logs

## 📝 Notes

- Chỉ support GLB format
- Requires network connection để load models
- Best performance trên physical devices
- iOS/Android compatible
