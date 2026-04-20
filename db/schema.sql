CREATE DATABASE IF NOT EXISTS bookstore;
USE bookstore;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    quantity INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'ordered',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Default Admin (password: admin123)
-- Note: You should hash this password with bcrypt if inserting manually, 
-- but for the sake of the setup, the first registered user can be promoted to admin.
