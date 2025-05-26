-- Buat database
CREATE DATABASE IF NOT EXISTS sipandora;
USE sipandora;

-- Buat tabel user
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin_pmi', 'admin_rs') NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tambahkan data dummy (opsional)
INSERT INTO users (email, password, role, full_name) VALUES 
('muelhizkia@gmail.com', '$2y$10$N9Q2KWfQ05wkxtaRFL7WUukCJtTAFvzyysiqNoGU8ahg7rJA0/2A6', 'user', 'User Biasa'),
('admin_pmi@sipandora.com', ' $2y$10$tVaSRC/kWOh5UZaSJkf89uC1T77FWHC2eitfiETpHT8Pd22fR9bIe ', 'admin_pmi', 'Admin PMI'),
('admin_rs@sipandora.com', '$2y$10$8GeyxeR034X4WC6V6beUDebdgYaw6nZCXzgr9pxqsF08dQt4we3GO', 'admin_rs', 'Admin Rumah Sakit');

-- Password untuk semua akun dummy adalah "password"