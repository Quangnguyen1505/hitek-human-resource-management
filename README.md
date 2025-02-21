# 📌 Quản lý nhân sự

## 🚀 Giới thiệu

Dự án Quản lý nhân sự giúp admin quản lý nhân sự một cách hiệu quả. Dự án được xây dựng bằng TypeScript, Node.js, Express và MongoDB, tích hợp Singleton Pattern trong quá trình khởi tạo database.

## Phiên bản

- Node.js: v20.17.0
- Express: v5.0.1
- MongoDB: Latest (Dockerized)
- Docker: 27.3.1, Docker Compose: v2.30.3

## 📂 Cấu trúc thư mục

```
/task-hitek
│── src/                # Mã nguồn chính
│   ├── config/         # Cài đặt cấu hình
│   ├── controllers/    # Xử lý request
│   ├── core/           # Xử lý response và error
│   ├── db/             # Kết nối MongoDB (Singleton Pattern)
│   ├── middlewares/    # Middleware chung
│   ├── models/         # Mô hình dữ liệu Mongoose
│   ├── repository/     # Truy vấn dữ liệu
│   ├── routes/         # Routes API
│   ├── services/       # Business logic
│   ├── utils/          # Hỗ trợ tổng quát
│   ├── app.ts          # Khởi tạo ứng dụng Express
│   ├── index.ts        # Khởi động server
│── .dockerignore               # Bỏ qua file khi build Docker
│── .editorconfig               # Cấu hình quy tắc format code cho Editor
│── .env                        # Biến môi trường cho ứng dụng
│── .env.example                # Mẫu file .env, hướng dẫn cấu hình biến môi trường
│── .gitignore                  # Bỏ qua file khi commit vào Git
│── .prettierrc                 # Cấu hình Prettier để format code
│── docker-compose.prod.yml     # Cấu hình Docker Compose cho môi trường production
│── docker-compose.yml          # Chạy dự án với Docker Compose
│── Dockerfile                  # Đóng gói dự án thành Docker image
│── eslint.config.mjs           # Cấu hình ESLint để kiểm tra code
│── nodemon.json                # Cấu hình Nodemon để tự động reload server khi code thay đổi
│── package-lock.json           # Khóa phiên bản dependencies
│── package.json                # Quản lý dependencies và script chạy dự án
│── README.md                   # Tài liệu hướng dẫn cách sử dụng dự án
│── tsconfig.json               # Cài đặt TypeScript cho dự án
```

## 📌 Cấu trúc Database

### 🗝️ **Bảng `keys`** (Lưu trữ khóa bảo mật)

| Trường              | Kiểu dữ liệu               | Bắt buộc | Mô tả |
|---------------------|---------------------------|---------|------|
| `_id`              | `ObjectId`                 | ✅       | ID của khóa (tự động tạo bởi MongoDB) |
| `user`             | `ObjectId (ref: Shop)`     | ✅       | ID của Shop liên kết với khóa này |
| `privateKey`       | `String`                   | ✅       | Khóa riêng tư |
| `publicKey`        | `String`                   | ✅       | Khóa công khai |
| `refreshTokensUsed` | `Array<String>`            | ❌       | Danh sách các refresh token đã sử dụng |
| `refreshToken`     | `String`                   | ✅       | Refresh token hiện tại |
| `createdAt`        | `Date`                     | ✅       | Thời gian tạo (tự động) |
| `updatedAt`        | `Date`                     | ✅       | Thời gian cập nhật (tự động) |

---

### 👤 **Bảng `employees`** (Lưu trữ thông tin người dùng)

| Trường     | Kiểu dữ liệu             | Bắt buộc | Mô tả |
|-----------|-------------------------|---------|------|
| `_id`     | `ObjectId`               | ✅       | ID của nhân viên (tự động tạo bởi MongoDB) |
| `username` | `String (unique)`       | ✅       | Tên đăng nhập (không trùng lặp) |
| `fullname` | `String`                | ❌       | Họ và tên |
| `password` | `String`                | ✅       | Mật khẩu đã hash |
| `avatar`   | `String`                | ❌       | Ảnh đại diện |
| `status`   | `Enum('active', 'deactive')` | ✅  | Trạng thái tài khoản (mặc định: `active`) |
| `createdAt` | `Date`                 | ✅       | Thời gian tạo (tự động) |
| `updatedAt` | `Date`                 | ✅       | Thời gian cập nhật (tự động) |


## Hướng dẫn sử dụng

1. **Clone repo**

2. **Cài đặt Docker và Docker Compose**

## Chạy bằng Docker

### 3. Thêm file .env như trong env.example

### 4. Xây dựng và chạy container

```sh
docker-compose up --build -d
```
### 5. **Truy cập API**

```sh
http://localhost:3000/api/employees

### 6. Dừng container

```sh
docker-compose down
```

## Singleton Pattern trong khởi tạo MongoDB

Dự án áp dụng Singleton Pattern trong việc kết nối MongoDB nhằm tránh tình trạng tạo nhiều kết nối không cần thiết

## Ảnh chụp kết quả API

> Đính kèm ảnh từ Postman

## Các tính năng

### Đã làm:

- [x] Quản lý nhân sự(Xem tất cả, xem chi tiết, xóa, chỉnh sửa nhân sự )
- [x] Authentication(Đăng kí, đăng nhập, thay đổi mật khẩu)
- [x] Xác thực JWT bảo vệ router và tạo JWT sử dụng thuật toán đối xứng
- [x] Kết nối MongoDB theo Singleton Pattern
- [x] Dockerized backend + MongoDB sử dụng docker và docker-compose

### Chưa làm:

### Những thứ chưa được cải tiến:
- [] Tối ưu hóa docker image size

## Hướng dẫn deploy

1. **Clone repo**

```sh
git clone <repo_url>
```

2. **Cài đặt Docker và Docker Compose**
3. **Chạy lệnh sau**

```sh
docker-compose up --build -d
```

4. **Truy cập API**

```sh
http://localhost:3000/api/employees
```

