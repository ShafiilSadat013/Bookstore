const mysql = require('mysql2/promise');

// This function will run when the server starts
async function initDB() {
  // 1. Connect to MySQL without a database selected
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '' // Default XAMPP password is empty
  });

  // 2. Create the database if it doesn't exist
  await connection.query('CREATE DATABASE IF NOT EXISTS bookstore');
  await connection.query('USE bookstore');

  // 3. Create Users table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
    )
  `);

  // 4. Create Orders table
  await connection.query(`
    CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        book_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL,
        quantity INT DEFAULT 1,
        status VARCHAR(50) DEFAULT 'ordered',
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  console.log('Database & Tables Ready!');
  await connection.end();
}

// Regular pool for the application to use
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bookstore',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = { db, initDB };
