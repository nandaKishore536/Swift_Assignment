# Node.js Backend Assignment using TypeScript and MongoDB

## 📌 Project Description

This project is a backend application built with **Node.js**, **TypeScript**, and **MongoDB**. It provides a REST API for managing users, their posts, and comments using data from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) public API.

The goal is to:
- Load dummy data into MongoDB
- Perform CRUD operations using RESTful routes
- Use only allowed dependencies: `mongodb` and `typescript`

---

## 📁 Folder Structure

```
node_assignment/
├── src/
│   ├── server.ts         # Server entry point
│   ├── db.ts             # MongoDB connection
│   ├── routes.ts         # All route handlers
│   └── models/
│       ├── user.ts
│       ├── post.ts
│       └── comment.ts
├── package.json
├── tsconfig.json
```

---

## ⚙️ How to Run the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Start MongoDB Server
Ensure MongoDB is running locally on `mongodb://localhost:27017`.

### 3. Start the Server
```bash
npx ts-node src/server.ts
```

You should see:
```
Server running at http://localhost:3000
```

---

## 🔧 How to Use the APIs (with Postman)

### ✅ 1. `GET /load`
**Description**: Loads 10 users, their posts, and comments into MongoDB  
**URL**: `http://localhost:3000/load`  
**Method**: `GET`  
**Body**: _None_

📥 _Response on success:_
```json
{ "message": "Loaded users, posts, and comments." }
```

---

### ✅ 2. `DELETE /users`
**Description**: Deletes all users from the database  
**URL**: `http://localhost:3000/users`  
**Method**: `DELETE`

📥 _Response:_
```json
{ "message": "Deleted 10 users." }
```

---

### ✅ 3. `DELETE /users/:userId`
**Description**: Deletes a user by their ID  
**Example URL**: `http://localhost:3000/users/1`  
**Method**: `DELETE`

📥 _Success response:_
```json
{ "message": "User 1 deleted." }
```

📥 _If not found:_
```json
{ "error": "User not found." }
```

---

### ✅ 4. `GET /users/:userId`
**Description**: Retrieves a user by ID along with their posts and the comments on those posts  
**Example URL**: `http://localhost:3000/users/1`  
**Method**: `GET`

📥 _Response:_
```json
{
  "id": 1,
  "name": "Leanne Graham",
  "posts": [
    {
      "id": 1,
      "title": "...",
      "comments": [ { "id": 1, "body": "..." } ]
    }
  ]
}
```

---

### ✅ 5. `PUT /users`
**Description**: Adds a new user  
**URL**: `http://localhost:3000/users`  
**Method**: `PUT`  
**Body (JSON)**:

```json
{
  "id": 999,
  "name": "Test User",
  "username": "testuser",
  "email": "test@example.com",
  "address": {
    "street": "Main St",
    "suite": "Apt. 1",
    "city": "Hyderabad",
    "zipcode": "500001",
    "geo": { "lat": "17.3850", "lng": "78.4867" }
  },
  "phone": "123-456-7890",
  "website": "test.com",
  "company": {
    "name": "TestCorp",
    "catchPhrase": "Testing Solutions",
    "bs": "tech test"
  }
}
```

📥 _Success Response:_
```json
{ "message": "User created." }
```

📥 _Conflict Response (duplicate):_
```json
{ "error": "User already exists." }
```

---

## 📤 Submission Guidelines

- Zip the entire `node_assignment/` folder
- Upload it to Google Drive
- Share the link (with viewing permissions) as per instructions

---

## ✅ Notes

- Only allowed dependencies used: `mongodb`, `typescript`
- No frameworks like Express or Mongoose
- Data is fetched from JSONPlaceholder and structured manually
- All responses follow RESTful principles with proper status codes

---

## 👨‍💻 Developed by
**Nandakishore**
