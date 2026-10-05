# HƯỚNG DẪN TẠO PROJECT FRONTEND TỪ ĐẦU (THI PE SBA301)

---

## BƯỚC 1: KHỞI TẠO PROJECT VITE
Mở Terminal tại thư mục chỉ định của đề thi:
```bash
# 1. Tạo project Vite (React + JavaScript hoặc TypeScript theo đề)
npm create vite@latest <ClassName>_<StudentID>_<ProjectCode>_PE -- --template react

# 2. Di chuyển vào thư mục project
cd <ClassName>_<StudentID>_<ProjectCode>_PE

# 3. Cài đặt các thư viện bắt buộc (KHÔNG cài thêm thư viện ngoài đề)
npm install react-router-dom axios bootstrap react-bootstrap
```

---

## BƯỚC 2: CẤU HÌNH CƠ BẢN

### 1. Import Bootstrap vào `src/main.jsx` (hoặc `src/main.tsx`)
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

### 2. Cấu hình file `jsconfig.json` (ở thư mục gốc, theo yêu cầu đề mục 3.8)
Tạo file `jsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "*": ["../../node_modules/*"]
    }
  }
}
```

---

## BƯỚC 3: CẤU TRÚC THƯ MỤC CHUẨN

Tạo các thư mục trong `src/`:
```text
src/
├── components/
│   ├── Header.jsx
│   └── Footer.jsx
├── pages/
│   ├── List.jsx
│   ├── Create.jsx
│   └── Detail.jsx
├── services/
│   └── api.js
├── App.jsx
└── main.jsx
```

---

## BƯỚC 4: TẠO FILE GỌI API (`src/services/api.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const get = (endpoint) => api.get(endpoint);
export const post = (endpoint, data) => api.post(endpoint, data);
export const put = (endpoint, data) => api.put(endpoint, data);
export const remove = (endpoint) => api.delete(endpoint);

export default api;
```

---

## BƯỚC 5: CẤU HÌNH ROUTER (`src/main.jsx` hoặc `src/App.jsx`)

Trong `src/main.jsx`:
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import List from './pages/List';
import Create from './pages/Create';
import Detail from './pages/Detail';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
```

---

## BƯỚC 6: XÂY DỰNG CÁC TRANG CHÍNH

### 1. Trang Danh Sách (`src/pages/List.jsx`)
- `useEffect`: Gọi API danh mục và API phân trang nguyên liệu (lần đầu vào trang).
- Input Search tên + Dropdown Search danh mục.
- Nút **Search**: Gọi API kèm query params `?name=...&categoryId=...`.
- Nút **Add new**: `navigate('/create')`.
- Table danh sách:
  - Nếu mảng rỗng: hiển thị `"Not found"`.
  - Nút **View**: `navigate('/detail/' + item.id)`.
  - Nút **Delete**: Mở Modal Popup xác nhận -> Bấm xóa gọi API `DELETE` -> Reload lại bảng (KHÔNG dùng `window.confirm`).

### 2. Trang Thêm Mới (`src/pages/Create.jsx`)
- State cho từng trường nhập liệu.
- `useEffect`: Gọi API lấy danh sách Category để nạp vào dropdown.
- Hàm `validate()` trước khi submit:
  - Hiển thị lỗi màu đỏ phía dưới ô input (`<Form.Control.Feedback type="invalid">`).
  - Lỗi hệ thống/thành công hiển thị bằng Modal hoặc Alert dưới tiêu đề (KHÔNG dùng `alert()`).
- Gọi API `POST` gửi dữ liệu.
- Nút **Back**: `navigate('/list')`.

### 3. Trang Chi Tiết (`src/pages/Detail.jsx`)
- Lấy `const { id } = useParams()`.
- `useEffect`: Gọi `GET /ingredients/${id}`.
- Hiển thị thông tin lên Table.
- Nút **Back**: `navigate('/list')`.

---

## BƯỚC 7: CÁC QUY TẮC CẦN NHỚ TRÁNH BỊ 0 ĐIỂM
1. **Không dùng `alert()` hoặc `confirm()` của window** -> Phải dùng `Modal` của React-Bootstrap.
2. **Không cài thư viện ngoài đề** (chỉ dùng: `react`, `react-dom`, `react-router-dom`, `react-bootstrap`, `bootstrap`, `axios`).
3. **Cổng chạy Frontend:** Mặc định `5173`.
4. **URL API Backend:** `http://localhost:8080/api`.

---

## BƯỚC 8: NỘP BÀI (EOS)
1. Tắt terminal đang chạy (`Ctrl + C`).
2. Vào thư mục project -> **XÓA THƯ MỤC `node_modules`**.
3. Đổi tên/kiểm tra tên thư mục đúng định dạng: `<ClassName>_<StudentID>_<ProjectCode>_PE`.
4. Chuột phải vào thư mục -> **Send to** -> **Compressed (zipped) folder** (`.zip`).
5. Nộp file `.zip` lên hệ thống EOS.
