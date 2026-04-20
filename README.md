# Simple Book Store Web App

A minimal full-stack bookstore application.

## Prerequisites
- **XAMPP** (or any MariaDB/MySQL server)
- **Node.js** (v14 or later)
- **npm**

## Setup Instructions

### 1. Database Setup (XAMPP/phpMyAdmin)
1. Open XAMPP Control Panel and start **Apache** and **MySQL**.
2. Go to [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
3. Click on the **SQL** tab.
4. Copy the contents of `db/schema.sql` and paste them into the SQL box.
5. Click **Go** to create the `bookstore` database and tables.

### 2. Backend Setup
1. Open a terminal in the `server` folder.
2. Run:
   ```bash
   npm install
   node server.js
   ```
3. The server will start on [http://localhost:5000](http://localhost:5000).

### 3. Frontend Setup
1. Open a terminal in the `client` folder.
2. Run:
   ```bash
   npm install
   npm run dev
   ```
3. The app will be available at [http://localhost:5173](http://localhost:5173).

## How to Test
1. **Register**: Go to the Register page and create an account. The first user registered automatically becomes an **Admin**.
2. **Search Books**: On the home page, search for a book (e.g., "JavaScript").
3. **Buy Book**: Click "Buy Book" (requires login).
4. **View Orders**: Go to "My Orders" to see your purchases and cancel them.
5. **Admin Panel**: If logged in as the first user, click "Admin" to see all users and all orders.

## Project Structure
- `server/`: Express backend with routes and middleware.
- `client/`: Simple React frontend using Vite.
- `db/`: SQL schema for the database.
