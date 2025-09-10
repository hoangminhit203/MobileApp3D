# API Integration Guide

## Cấu trúc API trong project

### 📁 Thư mục và files

```
api/
  api.ts                    # Configuration và helper functions chung
Service/
  itemService.ts           # API calls liên quan đến items/products
  categoryService.ts       # API calls liên quan đến categories  
  authService.ts           # API calls liên quan đến authentication
hooks/
  useApi.ts               # Custom hooks để quản lý API calls
```

### 🔧 Cách sử dụng

#### 1. Import services trong component:

```tsx
import { fetchAllItems, fetchItemById } from "@/Service/itemService";
import { fetchAllCategories } from "@/Service/categoryService";
```

#### 2. Sử dụng trong component:

```tsx
// Cách 1: Sử dụng trực tiếp
useEffect(() => {
  async function loadData() {
    try {
      const items = await fetchAllItems();
      setItems(items);
    } catch (error) {
      console.error(error);
    }
  }
  loadData();
}, []);

// Cách 2: Sử dụng custom hook
const { data: items, loading, error } = useItems();
```

#### 3. Các API endpoints hiện có:

**Items:**
- `fetchAllItems()` - Lấy tất cả items
- `fetchItemById(id)` - Lấy item theo ID
- `searchItems(query)` - Tìm kiếm items
- `fetchItemsByCategory(categoryId)` - Lấy items theo category

**Categories:**
- `fetchAllCategories()` - Lấy tất cả categories
- `fetchCategoryById(id)` - Lấy category theo ID

**Auth:**
- `login(email, password)` - Đăng nhập
- `register(userData)` - Đăng ký
- `getUserProfile(token)` - Lấy thông tin user

### 🔒 Authentication

Token JWT hiện tại được hard-code trong `itemService.ts`. Trong production, bạn nên:

1. Lưu token trong AsyncStorage sau khi login
2. Sử dụng token động cho mỗi request
3. Refresh token khi hết hạn

### 📱 Components đã được cập nhật

1. **SearchBar** - Có thể tìm kiếm qua API
2. **Category page** - Load categories và items từ API
3. **Home page (index.tsx)** - Load items từ API với fallback là seed data

### 🚀 Chạy và test

```bash
npm start
# hoặc
expo start
```

### 📝 Notes

- Tất cả API calls đều có error handling
- Có fallback data khi API fail
- Loading states được implement
- Code được organize theo modules để dễ maintain
