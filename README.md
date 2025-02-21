# Quản lý nhân sự

## Giới thiệu

Dự án Quản lý nhân sự giúp admin quản lý nhân sự một cách hiệu quả. Dự án được xây dựng bằng TypeScript, Node.js, Express và MongoDB, tích hợp Singleton Pattern trong quá trình khởi tạo database.

## Phiên bản

- Node.js: v20.17.0
- Express: v5.0.1
- MongoDB: Latest (Dockerized)
- Docker: 27.3.1, Docker Compose: v2.30.3

## Cấu trúc thư mục

```
/task-hitek
│── src/                # Mã nguồn chính
│   ├── app.ts          # Khởi tạo ứng dụng Express
│   ├── config/         # Cài đặt cấu hình
│   ├── controllers/    # Xử lý request
│   ├── core/           # Xử lý response và error
│   ├── db/             # Kết nối MongoDB (Singleton Pattern)
│   ├── middlewares/    # Middleware chung
│   ├── models/         # Mô hình dữ liệu Mongoose
│   ├── repository/     # Truy vấn dữ liệu
│   ├── routes/         # Routes API
│   ├── services/       # Business logic
│   ├── tests/          # Kiểm thử
│   ├── utils/          # Hỗ trợ tổng quát
│   ├── type.d.ts       # Định nghĩa kiểu TypeScript
│── .editorconfig       # Cấu hình Editor
│── .env                # Biến môi trường
│── .gitignore          # Bỏ qua file khi commit
│── docker-compose.yml  # Chạy dự án với Docker Compose
│── Dockerfile          # Đóng gói dự án
│── eslint.config.mjs   # ESLint config
│── nodemon.json        # Nodemon config
│── package.json        # Quản lý dependencies
│── README.md           # Tài liệu hướng dẫn
│── tsconfig.json       # Cài đặt TypeScript
```

## Cài đặt

### 1. Cài đặt các dependencies

```sh
npm install
```

### 2. Chạy linter kiểm tra code

```sh
npm run lint
```

### 3. Biên dịch TypeScript

```sh
npm run build
```

### 4. Chạy ứng dụng

```sh
npm start
```

## Chạy bằng Docker

### 1. Xây dựng và chạy container

```sh
docker-compose up --build -d
```

### 2. Dừng container

```sh
docker-compose down
```

## Singleton Pattern trong khởi tạo MongoDB

Dự án áp dụng Singleton Pattern trong việc kết nối MongoDB nhằm tránh tình trạng tạo nhiều kết nối không cần thiết

## Ảnh chụp kết quả API

> Đính kèm ảnh từ Postman

## Các tính năng

### Đã làm:

- [x] Quản lý nhân sự
- [x] CRUD nhân sự
- [x] Xác thực JWT
- [x] Kết nối MongoDB theo Singleton Pattern
- [x] Dockerized backend + MongoDB

### Chưa làm:

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

## Chia sẻ mã ngồn

Mã ngồn được chia sẻ tại: [GitHub/GitLab link]
