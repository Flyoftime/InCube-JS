# **REST API InCube**

aplikasi IoT untuk inkubator otomatis yang dibangun menggunakan Next.js sebagai platform website fullstack, MySQL sebagai database, dan Prisma sebagai ORM. REST API diimplementasikan menggunakan fitur App Router dari Next.js. Aplikasi ini juga memanfaatkan MQTT sebagai broker untuk komunikasi real-time antara perangkat IoT dan server.

Selain itu, aplikasi ini dilengkapi dengan aplikasi mobile yang dikembangkan menggunakan Flutter, memungkinkan pengguna untuk memantau dan mengontrol proses inkubasi secara langsung melalui perangkat mobile. Fitur-fitur utama meliputi pemantauan kondisi secara real-time, pengaturan suhu dan kelembapan, notifikasi otomatis, serta laporan historis untuk memastikan kondisi inkubasi yang optimal.

URL lengkap diberikan dalam respons, respons tersebut akan ditampilkan seolah-olah layanan tersebut berjalan pada 'http://localhost:3000/'.

## Tech Stack

**Language:** Javascript and Dart \
**Server:** Next JS \
**Framework:** Next JS and Flutter \
**ORM:** Prisma \
**Database:** Mysql

## API Structure

### Spek API

### Auth

| Routes          | HTTP | Deskrips | Dibuat | Hasil Test |
| --------------- | ---- | -------- | ------ | ---------- |
| `/api/login`    | POST | signin   | Ya     | Ya         |
| `/api/register` | POST | signup   | Ya     | Ya         |

#### Users Profile

| Routes          | HTTP   | Deskripsi                        | Dibuat | Hasil Test |
| --------------- | ------ | -------------------------------- | ------ | ---------- |
| `/api/user`     | GET    | Get all user profile (for admin) | Ya     | Ya         |
| `/api/user`     | POST   | Create user profile              | Ya     | Ya         |
| `/api/user/:id` | GET    | Get one user profile by id       | Ya     | Ya         |
| `/api/user/:id` | PUT    | Update user profile              | Ya     | Ya         |
| `/api/user/:id` | DELETE | Delete user profile              | Ya     | Ya         |

#### Users address

| Routes             | HTTP   | Deskripsi                        | Dibuat | Hasil Test |
| ------------------ | ------ | -------------------------------- | ------ | ---------- |
| `/api/address`     | GET    | Get all user address (for admin) | Belum  | Belum      |
| `/api/address`     | POST   | Create user address              | Ya     | Ya         |
| `/api/address/:id` | GET    | Get one user address by id       | Ya     | Ya         |
| `/api/address/:id` | PUT    | Update user address              | Ya     | Ya         |
| `/api/address/:id` | DELETE | Delete user address              | Belum  | Belum      |

#### user-premium

| Routes                  | HTTP   | Deskripsi                        | Dibuat | Hasil Test |
| ----------------------- | ------ | -------------------------------- | ------ | ---------- |
| `/api/user-premium`     | GET    | Get all user premium (for admin) | Belum  | Belum      |
| `/api/user-premium`     | POST   | transaction payment              | Belum  | Belum      |
| `/api/user-premium/:id` | GET    | Get one user premium by id       | Ya     | Ya         |
| `/api/user-premium/:id` | PUT    | Update user subscription         | Belum  | Belum      |
| `/api/user-premium/:id` | DELETE | Delete user subscription         | Belum  | Belum      |

#### Data Sensor Product

| Routes                        | HTTP | Deskripsi                               | Dibuat | Hasil Test |
| ----------------------------- | ---- | --------------------------------------- | ------ | ---------- |
| `/api/data/storeData`         | GET  | Store data dari esp ke db dengan params | ya     | ya         |
| `/api/data/sensor`            | GET  | Get all data sensor                     | ya     | ya         |
| `/api/data/sensor/:productId` | GET  | get data sensor by id product           | Ya     | Ya         |

#### Control Product

| Routes                           | HTTP | Deskripsi                                      | Dibuat | Hasil Test |
| -------------------------------- | ---- | ---------------------------------------------- | ------ | ---------- |
| `/api/data/relay/:productId`     | GET  | kontrol salah satu relay berdasarkan id produk | ya     | ya         |
| `/api/data/threshold/:productId` | GET  | kontrol batas suhu untuk menyalakan fan        | ya     | ya         |

### Struktur REST API di next js:

```
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── address
│   │   │   │   └── [id]
│   │   │   │       └── route.ts
│   │   │   ├── auth
│   │   │   │   ├── [...nextauth]
│   │   │   │   │   └── route.ts
│   │   │   │   └── route.ts
│   │   │   ├── data
│   │   │   │   ├── lamp
│   │   │   │   │   └── [productId]
│   │   │   │   │       └── route.ts
│   │   │   │   ├── relay
│   │   │   │   │   └── [productId]
│   │   │   │   │       └── route.ts
│   │   │   │   ├── sensor
│   │   │   │   │   └── [id]
│   │   │   │   │       └── route.ts
│   │   │   │   ├── storeDataSensor
│   │   │   │   │   └── route.ts
│   │   │   │   └── threshold
│   │   │   │       └── [productId]
│   │   │   │           └── route.ts
│   │   │   ├── login
│   │   │   │   └── route.ts
│   │   │   ├── register
│   │   │   │   └── route.ts
│   │   │   ├── user
│   │   │   │   ├── [id]
│   │   │   │   │   └── route.ts
│   │   │   │   └── user-premium
│   │   │   │       └── [id]
│   │   │   │           └── route.ts
```

## Auth Endpoints

Endpoint untuk authentikasi:

### Login

Path : `/login` \
Method : `POST`

#### Request

```
curl http://localhost:3000/login
```

Request dari client (json)

```
{
  "email" : "fuad@gmail.com",
  "password" : "12345678"
}
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "message": "Login berhasil.",
  "user": {
    "id": 1,
    "username": "afuad",
    "email": "fuad@gmail.com",
    "created_at": "2024-12-23T17:11:52.000Z"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error` atau `404 Email not found `

### Register

Path : `/register` \
Method : `POST`

#### Request

```
curl http://localhost:3000/register
```

Request dari client (json)

```
{
  "email" : "fuad@gmail.com",
  "password" : "12345678"
}
```

#### Successful Responses

Code : `201 Created` \
Content examples

```json
{
  "message": "Login berhasil.",
  "user": {
    "id": 1,
    "username": "afuad",
    "email": "fuad@gmail.com",
    "created_at": "2024-12-23T17:11:52.000Z"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error`

## Profile Endpoints

endpoint untuk user profile

### Get All User Profil

Path : `/user` \
Method : `GET`

#### Request

```
curl http://localhost:3000/api/user
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
"success": true,
    "data": [
      {
        "id": 1,
        "id_user": 1,
        "name": "Fuad grimaldi",
        "age": "22",
        "gender": "Male",
        "contact": "087834233222",
        "job": "IT Spesialist",
        "created_at": null,
        "users": {
          "id": 1,
          "username": "afuad",
          "email": "fuad@gmail.com",
          "password": "$2b$10$rviii1m6HepxlPvcUiMGm.CxsC9ZddctoSTwzMA6WqIvIk2FJeLmq",
          "created_at": "2024-12-23T17:11:52.000Z"
        }
      },
      {
        "id": 7,
        "id_user": 7,
        "name": "Regista Siti",
        "age": "19",
        "gender": "Female",
        "contact": "0834234323",
        "job": "Mahasiswa",
        "created_at": "2024-12-24T03:03:39.000Z",
        "users": {
          "id": 7,
          "username": "rere",
          "email": "rere@gmail.com",
          "password": "$2b$10$4mYP8rZy6CyswTwk3bWet.xyJczOnVaisOiPULBkCvDPJ8pgA3Z6i",
          "created_at": "2024-12-24T03:03:39.000Z"
        }
      },
    ]
```

#### Error Responses

Code : `500 Internal Server Error`

### Get A user profile

Path : `user/:id` \
Method : `GET`

#### Request

```
curl http://localhost:8080/api/user/7
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "success": true,
  "data": {
    "success": true,
    "data": {
      "id": 7,
      "id_user": 7,
      "name": "Regista Siti",
      "age": "19",
      "gender": "Female",
      "contact": "0834234323",
      "job": "Mahasiswa",
      "created_at": "2024-12-24T03:03:39.000Z",
      "users": {
        "id": 7,
        "username": "rere",
        "email": "rere@gmail.com",
        "password": "$2b$10$4mYP8rZy6CyswTwk3bWet.xyJczOnVaisOiPULBkCvDPJ8pgA3Z6i",
        "created_at": "2024-12-24T03:03:39.000Z"
      }
    }
  }
}
```

#### Error Responses

Code : `500 Internal Server Error` or `404 Not found`

### Create user profile

Path : `/user` \
Method : `POST`

#### Request

```
curl http://localhost:8080/api/user
```

request dari sisi client seperti ini

```json
{
  "id_user": 2,
  "name": "Asep Ginanjar",
  "age": "21",
  "gender": "Male",
  "contact": "087834234322",
  "job": "Model"
}
```

#### Successful Responses

Code : `201 Created` \
Content examples

```json
"success": true,
"data": {
  "id": 12,
  "id_user": 8,
  "name": "Asep Ginanjar",
  "age": "21",
  "gender": "Male",
  "contact": "087834234322",
  "job": "Model",
  "created_at": "2025-01-09T18:07:32.000Z"
}
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

### Update A User profile

Path : `user/:id` \
Method : `PUT`

#### Request

```
curl http://localhost:8080/api/user/8
```

This is a client request to update a user profile

```json
{
  "name": "Asep genjer",
  "age": "78",
  "gender": "Male",
  "contact": "087834234322",
  "job": "Super Model"
}
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "success": true,
  "data": {
    "id": 12,
    "id_user": 8,
    "name": "Asep genjer",
    "age": "78",
    "gender": "Male",
    "contact": "087834234322",
    "job": "Super Model",
    "created_at": "2025-01-09T18:07:32.000Z"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

### Delete A User Profile

Path : `book/:id` \
Method : `DELETE`

#### Request

```
curl http://localhost:8080/api/user/8
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### Error Response

Code : `500 Internal Server Error`

This README provides a comprehensive guide to understanding, setting up, and interacting with the Books CRUD REST API built with Golang, Echo, GORM, and SQLite3.

## Address Endpoints

endpoint untuk Alamat user

### Get A user address

Path : `address/:id` \
Method : `GET`

#### Request

```
curl http://localhost:3000/api/address/1
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "success": true,
  "data": {
    "id": 5,
    "id_user": 1,
    "Kecamatan": "darmaraja",
    "provinsi": "jawa barat",
    "Kabupaten": "sumedang",
    "Kelurahan": "cikeusi",
    "Kode_pos": "03423",
    "alamat_lengkap": "Citembong Girang"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error` or `404 Not found`

### Create user address

Path : `/address` \
Method : `POST`

#### Request

```
curl http://localhost:3000/api/address
```

request dari sisi client seperti ini

```json
{
  "id_user": 7,
  "Kecamatan": "Sukajadi",
  "provinsi": "Jawa Barat",
  "Kabupaten": "Bandung",
  "kelurahan": "Pasteur",
  "Kode_pos": "40161",
  "alamat_lengkap": "Jalan Sukajadi No. 123, Bandung"
}
```

#### Successful Responses

Code : `201 Created` \
Content examples

```json
{
  "success": true,
  "data": {
    "id": 7,
    "id_user": 7,
    "Kecamatan": "Sukajadi",
    "provinsi": "Jawa Barat",
    "Kabupaten": "Bandung",
    "Kelurahan": "Pasteur",
    "Kode_pos": "40161",
    "alamat_lengkap": "Jalan Sukajadi No. 123, Bandung"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

## Data Sensor Endpoints

endpoint untuk pengolahan data sensor incube

### Store data sensor to db

Path : `data/storeDataSensor` \
Method : `GET`\
Params : `produk`, `temperature`, `humidity`, `gas`, `fan_status`, `lamp_status`

#### Request

```
curl http://localhost:3000/api/data/storeDataSensor?produk=IC0002&temperature=28.10&humidity=90.00&gas=0.00&fan_status=OFF&lamp_status=ON
```

#### Successful Responses

Code : `200 OK` | `201 Created` \
Content examples

```json
{
  "status": 201,
  "success": true,
  "message": "Sensor data created successfully",
  "data": {
    "id": 87,
    "id_produk": "IC0002",
    "suhu": 29.1,
    "humid": 80,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:23:34.000Z"
  }
}
```

#### Error Responses

Code : `500 Internal Server Error`

### get all data sensor

Path : `/data/sensor` \
Method : `GET`

#### Request

```
curl http://localhost:3000/api/data/sensor
```

#### Successful Responses

Code : `200 Ok` \
Content examples

```json
[
  {
    "id": 88,
    "id_produk": "IC0001",
    "suhu": 26.7,
    "humid": 80,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:24:19.000Z"
  },
  {
    "id": 87,
    "id_produk": "IC0002",
    "suhu": 29.1,
    "humid": 80,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:23:34.000Z"
  },
  {
    "id": 86,
    "id_produk": "IC0001",
    "suhu": 27.1,
    "humid": 80,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:14:15.000Z"
  },
  {
    "id": 85,
    "id_produk": "IC0001",
    "suhu": 26.7,
    "humid": 81,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:04:09.000Z"
  },
  {....
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

### get all data sensor by id product

Path : `/data/sensor/:productId` \
Method : `GET`

#### Request

```
curl http://localhost:3000/api/data/sensor/IC0002
```

#### Successful Responses

Code : `200 Ok` \
Content examples

```json
[
  {
    "id": 87,
    "id_produk": "IC0002",
    "suhu": 29.1,
    "humid": 80,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-09T18:23:34.000Z"
  },
  {
    "id": 63,
    "id_produk": "IC0002",
    "suhu": 28.1,
    "humid": 90,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-08T10:02:07.000Z"
  },
  {
    "id": 62,
    "id_produk": "IC0002",
    "suhu": 28.1,
    "humid": 90,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-08T10:00:01.000Z"
  },
  {
    "id": 61,
    "id_produk": "IC0002",
    "suhu": 27.6,
    "humid": 90,
    "gas": 0,
    "lampu": "ON",
    "fan": "OFF",
    "ts": "2025-01-07T22:49:24.000Z"
  }
]
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

## Control Endpoints

endpoint untuk kontrol incube

### Control temperature with threshold

Path : `data/threshold/:productId` \
Method : `GET`\
Params : `minThreshold`, `maxThreshold`

#### Request

```
http://localhost:3000/api/data/threshold/IC0001?minThreshold=39&maxThreshold=40
```

#### Successful Responses

Code : `200 OK` \
Content examples

```json
{
  "message": "Max temperature threshold updated from: 39.00°C to 40.00°C"
}
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`

### Control ON/OFF Relay 2

Path : `/data/relay/:productId` \
Method : `GET`
params : `state`

#### Request

```
curl http://localhost:3000/api/data/relay/IC0001?state=on
```

#### Successful Responses

Code : `200 Ok` \
Content examples

```json
{
  "message": "Relay fan manual updated"
}
```

#### Error Responses

Code : `500 Internal Server Error` or `400 Bad request`
