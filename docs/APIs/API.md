## 📌 Danh Sách API

**Dùng Ctrl + Shift + V để Xem file .md nếu dùng vscode**

### 🛠️ **Xác Thực (Authentication)**

| Phương Thức | Endpoint                            | Mô Tả                                                                                                                                   | Yêu Cầu Header |
| ----------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `POST`      | `/api/v1/auth/register`             | Đăng ký tài khoản mới                                                                                                                   | ❌            |
| `POST`      | `/api/v1/auth/login`                | Đăng nhập                                                                                                                               | ❌            |
| `POST`      | `/api/v1/auth/change-password`      | Thay đổi mật khẩu                                                                                                                       | ✅            |
| `POST`      | `/api/v1/auth/handler-refreshToken` | Xử lý refresh token để cấp token mới khi access token hết hạn, đồng thời kiểm tra bảo mật để tránh các cuộc tấn công sử dụng lại token. | ✅            |

---

### 👤 **Nhân sự (Employees)**

| Phương Thức | Endpoint                | Mô Tả                         | Yêu Cầu Header |
| ----------- | ----------------------- | ----------------------------- | ------------- |
| `GET`       | `/api/v1/employees`     | Lấy danh sách nhân sự         | ✅            |
| `GET`       | `/api/v1/employees/:id` | Lấy thông tin nhân sự theo ID | ✅            |
| `PUT`       | `/api/v1/employees/:id` | Cập nhật thông tin nhân sự    | ✅            |
| `DELETE`    | `/api/v1/employees/:id` | Xóa nhân sự                   | ✅            |

### 📌 Các tham số Header của API
```sh
x-client-id: <userId>
authorization: <accessToken>
x-rtoken-id: <refreshToken>
```
**Riêng `/api/v1/auth/handler-refreshToken` cần `x-client-id`, `authorization`, `x-rtoken-id`.**  
**Còn lại, những API nào yêu cầu Header thì cần `x-client-id`, `authorization`.**