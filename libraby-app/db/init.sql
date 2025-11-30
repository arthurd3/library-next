-- TABELA DE ROLES
CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE GENEROS
CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE USUARIOS
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    registration VARCHAR(50) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    role_id INTEGER REFERENCES roles(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE LIVROS
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    description TEXT,
    genre_id INTEGER REFERENCES genres(id),
    cover_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE EMPRÉSTIMOS
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    status VARCHAR(20) DEFAULT 'active', -- active, overdue, returned
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE MULTAS
CREATE TABLE IF NOT EXISTS fines (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    book_id INTEGER REFERENCES books(id),
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, paid
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEEDERS
INSERT INTO roles (name) VALUES
('admin'),
('librarian'),
('user');

INSERT INTO genres (name) VALUES
('Romance'),
('Tecnologia'),
('Fantasia'),
('Distopia'),
('Autoajuda'),
('Fábula');

INSERT INTO users (name, email, password, registration, phone, address, role_id) VALUES
('Arthur Silva', 'admin@gmail.com', 'admin', '2023001', '(11) 99999-9999', 'Rua das Flores, 123 - São Paulo, SP', 1);

INSERT INTO books (title, author, genre_id, cover_url, available) VALUES
('Dom Casmurro', 'Machado de Assis', 1, 'https://via.placeholder.com/200x300/8B5A3C/FFFFFF?text=Dom+Casmurro', true),
('Clean Architecture', 'Robert C. Martin', 2, 'https://via.placeholder.com/200x300/4A90E2/FFFFFF?text=Clean+Architecture', false),
('O Hobbit', 'J.R.R. Tolkien', 3, 'https://via.placeholder.com/200x300/7B68EE/FFFFFF?text=O+Hobbit', true),
('1984', 'George Orwell', 4, 'https://via.placeholder.com/200x300/DC143C/FFFFFF?text=1984', true),
('Pense e Enriqueça', 'Napoleon Hill', 5, 'https://via.placeholder.com/200x300/FFD700/000000?text=Pense+e+Enriqueça', true),
('A Revolução dos Bichos', 'George Orwell', 6, 'https://via.placeholder.com/200x300/32CD32/FFFFFF?text=A+Revolução+dos+Bichos', false);