# Fake Data Implementation - API Removal

Đã thực hiện việc thay thế toàn bộ API calls bằng fake data để phát triển và test mà không cần kết nối server.

## Các thay đổi đã thực hiện:

### 1. Tạo file fake data mới:
- `/data/fakeData.ts` - Chứa tất cả fake data cho categories và items

### 2. Đã comment toàn bộ API calls trong các service:
- `/Service/categoryService.ts` - Comment API, sử dụng fake categories
- `/Service/itemService.ts` - Comment API, sử dụng fake items  
- `/Service/itemsData.ts` - Comment API, sử dụng fake items
- `/Service/authService.ts` - Comment API, sử dụng fake authentication

### 3. Đã comment hook API:
- `/hooks/useApi.ts` - Comment toàn bộ vì không cần thiết với fake data

### 4. Cập nhật components và pages:
- `/app/(tabs)/search.tsx` - Loại bỏ fallback, sử dụng hoàn toàn fake data
- `/components/SearchBar.tsx` - Hoạt động với fake search function
- `/app/category/[category].tsx` - Hoạt động với fake data

## Fake Data bao gồm:

### Categories:
- FURNITURE
- TOYS  
- SPORTS
- BABY + KIDS
- ELECTRONICS
- HOBBIES

### Items:
- 10 sản phẩm mẫu với đầy đủ thông tin (title, category, code, description, price, imageUrl)

### Auth:
- 2 fake users để test authentication
- Fake token system

## Các tính năng hoạt động:
✅ Hiển thị categories  
✅ Search products  
✅ Browse by category  
✅ Authentication (fake)  
✅ Loading states với simulate delay  

## Lưu ý:
- Tất cả API calls đã được comment, không bị xóa hoàn toàn
- Có thể dễ dàng khôi phục API bằng cách uncomment
- Fake data có thể dễ dàng mở rộng thêm sản phẩm/categories mới
- Simulate network delay để test loading states
