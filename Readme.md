# WeRent Review API Documentation

## Overview
WeRent Review API adalah backend service untuk sistem review pada platform rental pakaian WeRent. API ini menangani manajemen review produk, termasuk upload gambar, statistik review, dan fitur pencarian review berdasarkan kemiripan ukuran tubuh.

## Frontend Repository
```
https://github.com/davidfrdian/RevoU-Next-Milestone-1---Frontend
```

## Teknologi yang Digunakan

- Node.js
- Express.js
- MongoDB
- ImageKit (untuk penyimpanan gambar)

## Prasyarat

- Node.js (v14 atau lebih tinggi)
- MongoDB
- Akun ImageKit

## Authentication
Saat ini API tidak memerlukan autentikasi untuk endpoint review dan produk.

### Database
untuk inisiasi isi dari database bisa menggunakan seed.js dengan mengeksekusi
```
node seeder/seed.js
```
## Instalasi

1. Clone repository
```bash
git clone https://github.com/yourusername/BackEnd-RNext-Team1-milestone1.git
cd BE-Milestone-1
```

2. Install dependencies
```bash
npm install
```

3. Buat file `.env` di root directory dan isi dengan konfigurasi berikut:
```env
MONGODB_URI=MongooDB URL(link MongooDB)
```

4. inisiasi isi dari database
```bash
node seeder/seed.js
```

5. Jalankan aplikasi
```bash
node app.js
```
## Struktur Project

```
BE-Milestone-1/
├── controllers/
│   ├── product_controller.js
│   └── review_controller.js
├── models/
│   ├── product_models.js
│   └── review_models.js
├── routers/
│   ├── product_router.js
│   └── review_router.js
├── seeder/
│   ├── seed.js
├── app.js
└── package.json
```

## Dokumentasi Postman

```
https://documenter.getpostman.com/view/37852052/2sB2cPiQA6
```