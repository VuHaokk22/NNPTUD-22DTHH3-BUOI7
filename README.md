# Hệ thống Quản lý Inventory với Authentication

## Mô tả
Hệ thống quản lý inventory cho sản phẩm với authentication, các chức năng: tạo inventory tự động khi tạo sản phẩm, quản lý stock, reserved, soldCount, đăng ký và đăng nhập user.

## Cài đặt
1. Cài đặt Node.js và MongoDB
2. Clone repository: `git clone <url>`
3. Cài đặt dependencies: `npm install`
4. Chạy server: `npm start`

## API Endpoints

### Authentication
- POST /api/auth/register - Đăng ký: body {email, password, name}
- POST /api/auth/login - Đăng nhập: body {email, password}

### Products
- POST /api/products - Tạo sản phẩm (tự động tạo inventory)

### Inventory
- GET /api/inventory - Lấy tất cả inventory (join với product)
- GET /api/inventory/:id - Lấy inventory theo ID (join với product)
- POST /api/inventory/add-stock - Tăng stock: body {product: ObjectId, quantity: number}
- POST /api/inventory/remove-stock - Giảm stock: body {product: ObjectId, quantity: number}
- POST /api/inventory/reservation - Đặt trước: giảm stock, tăng reserved: body {product: ObjectId, quantity: number}
- POST /api/inventory/sold - Bán: giảm reserved, tăng soldCount: body {product: ObjectId, quantity: number}

## Chạy với Postman
1. Import collection hoặc tạo requests theo endpoints trên.
2. Đảm bảo MongoDB đang chạy.
3. Test từng chức năng.

## Git
- Repository đã được khởi tạo.
- Commits đã được tạo.