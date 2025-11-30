
-- ===========================================
-- BIBLIOTECA DIGITAL - SCHEMA DO BANCO DE DADOS
-- ===========================================

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

-- TABELA DE EMPRÉSTIMOS (Histórico/Ledger)
CREATE TABLE IF NOT EXISTS loans (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    book_id INTEGER REFERENCES books(id) ON DELETE CASCADE,
    loan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP NOT NULL,
    return_date TIMESTAMP, 
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- TABELA DE LIVROS ALUGADOS (Estado Atual)
CREATE TABLE IF NOT EXISTS rented_books (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL UNIQUE, -- Garante que um livro não pode ser alugado 2x ao mesmo tempo
    user_id INTEGER NOT NULL,
    loan_id INTEGER NOT NULL, -- Link para o registro histórico original
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_rented_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_rented_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_rented_loan FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE
);

-- TABELA DE MULTAS
CREATE TABLE IF NOT EXISTS fines (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    loan_id INTEGER REFERENCES loans(id), -- Vincula ao empréstimo específico
    amount DECIMAL(10,2) NOT NULL,
    due_date TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'paid'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ===========================================
-- ÍNDICES PARA PERFORMANCE
-- ===========================================

-- Índices para empréstimos
CREATE INDEX idx_loans_user ON loans(user_id);
CREATE INDEX idx_loans_book ON loans(book_id);
CREATE INDEX idx_loans_status ON loans(status);

-- Índices para livros alugados
CREATE INDEX idx_rented_books_user ON rented_books(user_id);
CREATE INDEX idx_rented_books_book ON rented_books(book_id);

-- Índices para multas
CREATE INDEX idx_fines_user ON fines(user_id);
CREATE INDEX idx_fines_loan ON fines(loan_id);

-- ===========================================
-- DADOS INICIAIS (SEEDERS)
-- ===========================================

-- Inserir roles padrão
INSERT INTO roles (name) VALUES
('admin'),
('librarian'),
('user')
ON CONFLICT (name) DO NOTHING;

-- Inserir gêneros literários
INSERT INTO genres (name, description) VALUES
('Ficção Científica', 'Exploração de conceitos científicos e futuros alternativos'),
('Fantasia', 'Mundos imaginários e seres fantásticos'),
('Romance', 'Histórias de amor e relacionamentos'),
('Mistério', 'Enigmas e investigações'),
('Terror', 'Histórias de suspense e horror'),
('Biografia', 'Histórias de vida reais'),
('História', 'Eventos e períodos históricos'),
('Autoajuda', 'Desenvolvimento pessoal e crescimento'),
('Tecnologia', 'Livros sobre ciência e tecnologia'),
('Literatura Brasileira', 'Obras de autores brasileiros'),
('Poesia', 'Expressão poética e literária'),
('Drama', 'Histórias emocionais e conflitos'),
('Aventura', 'Jornadas e descobertas'),
('Infantil', 'Literatura para crianças'),
('Jovem Adulto', 'Literatura para jovens adultos')
ON CONFLICT (name) DO NOTHING;

-- Inserir usuários (senha: password123)
INSERT INTO users (name, email, password, registration, phone, address, role_id) VALUES
('Admin User', 'admin@library.com', '123456', 'ADM001', '+55 11 99999-9999', 'Rua Admin, 123 - São Paulo, SP', 1),
('Librarian One', 'librarian1@library.com', 'password123', 'LIB001', '+55 11 99999-9998', 'Rua Biblioteca, 456 - São Paulo, SP', 2),
('Librarian Two', 'librarian2@library.com', 'password123', 'LIB002', '+55 11 99999-9997', 'Av. Livros, 789 - São Paulo, SP', 2),
('João Silva', 'joao@email.com', 'password123', 'USR001', '+55 11 99999-9996', 'Rua das Flores, 100 - São Paulo, SP', 3),
('Maria Santos', 'maria@email.com', 'password123', 'USR002', '+55 11 99999-9995', 'Av. Paulista, 200 - São Paulo, SP', 3),
('Pedro Oliveira', 'pedro@email.com', 'password123', 'USR003', '+55 11 99999-9994', 'Rua Verde, 300 - São Paulo, SP', 3),
('Ana Costa', 'ana@email.com', 'password123', 'USR004', '+55 11 99999-9993', 'Rua Azul, 400 - São Paulo, SP', 3),
('Carlos Ferreira', 'carlos@email.com', 'password123', 'USR005', '+55 11 99999-9992', 'Av. Amarela, 500 - São Paulo, SP', 3),
('Sofia Rodrigues', 'sofia@email.com', 'password123', 'USR006', '+55 11 99999-9991', 'Rua Rosa, 600 - São Paulo, SP', 3),
('Miguel Pereira', 'miguel@email.com', 'password123', 'USR007', '+55 11 99999-9990', 'Av. Roxa, 700 - São Paulo, SP', 3),
('Beatriz Gomes', 'beatriz@email.com', 'password123', 'USR008', '+55 11 99999-9989', 'Rua Laranja, 800 - São Paulo, SP', 3),
('Ricardo Alves', 'ricardo@email.com', 'password123', 'USR009', '+55 11 99999-9988', 'Av. Marrom, 900 - São Paulo, SP', 3),
('Catarina Sousa', 'catarina@email.com', 'password123', 'USR010', '+55 11 99999-9987', 'Rua Cinza, 1000 - São Paulo, SP', 3),
('André Martins', 'andre@email.com', 'password123', 'USR011', '+55 11 99999-9986', 'Av. Prata, 1100 - São Paulo, SP', 3),
('Inês Fernandes', 'ines@email.com', 'password123', 'USR012', '+55 11 99999-9985', 'Rua Ouro, 1200 - São Paulo, SP', 3),
('Tiago Carvalho', 'tiago@email.com', 'password123', 'USR013', '+55 11 99999-9984', 'Av. Bronze, 1300 - São Paulo, SP', 3),
('Marta Teixeira', 'marta@email.com', 'password123', 'USR014', '+55 11 99999-9983', 'Rua Cobre, 1400 - São Paulo, SP', 3),
('Bruno Lopes', 'bruno@email.com', 'password123', 'USR015', '+55 11 99999-9982', 'Av. Ferro, 1500 - São Paulo, SP', 3),
('Daniela Ribeiro', 'daniela@email.com', 'password123', 'USR016', '+55 11 99999-9981', 'Rua Aço, 1600 - São Paulo, SP', 3),
('Filipe Moreira', 'filipe@email.com', 'password123', 'USR017', '+55 11 99999-9980', 'Av. Metal, 1700 - São Paulo, SP', 3),
('Rita Pinto', 'rita@email.com', 'password123', 'USR018', '+55 11 99999-9979', 'Rua Pedra, 1800 - São Paulo, SP', 3),
('Diogo Cardoso', 'diogo@email.com', 'password123', 'USR019', '+55 11 99999-9978', 'Av. Madeira, 1900 - São Paulo, SP', 3),
('Patrícia Dias', 'patricia@email.com', 'password123', 'USR020', '+55 11 99999-9977', 'Rua Papel, 2000 - São Paulo, SP', 3)
ON CONFLICT (email) DO NOTHING;

-- Inserir livros
INSERT INTO books (title, author, genre_id, available) VALUES
-- Ficção Científica
('Dune', 'Frank Herbert', 1, true),
('Neuromancer', 'William Gibson', 1, true),
('Fundação', 'Isaac Asimov', 1, true),
('O Fim da Infância', 'Arthur C. Clarke', 1, true),
('Snow Crash', 'Neal Stephenson', 1, true),

-- Fantasia
('O Senhor dos Anéis: A Sociedade do Anel', 'J.R.R. Tolkien', 2, true),
('O Nome do Vento', 'Patrick Rothfuss', 2, true),
('O Temor do Sábio', 'Patrick Rothfuss', 2, true),
('A Roda do Tempo: O Olho do Mundo', 'Robert Jordan', 2, true),
('Mistborn: O Império Final', 'Brandon Sanderson', 2, true),

-- Romance
('Orgulho e Preconceito', 'Jane Austen', 3, true),
('Razão e Sensibilidade', 'Jane Austen', 3, true),
('O Morro dos Ventos Uivantes', 'Emily Brontë', 3, true),
('Jane Eyre', 'Charlotte Brontë', 3, true),
('Anna Karenina', 'Liev Tolstói', 3, true),

-- Mistério
('O Código Da Vinci', 'Dan Brown', 4, true),
('Anjos e Demônios', 'Dan Brown', 4, true),
('Sherlock Holmes: Um Estudo em Vermelho', 'Arthur Conan Doyle', 4, true),
('O Silêncio dos Inocentes', 'Thomas Harris', 4, true),
('Garota Exemplar', 'Gillian Flynn', 4, true),

-- Literatura Brasileira
('Dom Casmurro', 'Machado de Assis', 10, true),
('Memórias Póstumas de Brás Cubas', 'Machado de Assis', 10, true),
('Grande Sertão: Veredas', 'João Guimarães Rosa', 10, true),
('Vidas Secas', 'Graciliano Ramos', 10, true),
('Capitães da Areia', 'Jorge Amado', 10, true),

-- Tecnologia
('Clean Code', 'Robert C. Martin', 9, true),
('The Pragmatic Programmer', 'Andrew Hunt', 9, true),
('Design Patterns', 'Gang of Four', 9, true),
('Refactoring', 'Martin Fowler', 9, true),
('Code Complete', 'Steve McConnell', 9, true),

-- Biografia
('Steve Jobs', 'Walter Isaacson', 6, true),
('Einstein: Sua Vida e Seu Universo', 'Walter Isaacson', 6, true),
('Leonardo da Vinci', 'Walter Isaacson', 6, true),
('Churchill: Uma Vida', 'Andrew Roberts', 6, true),
('Mahatma Gandhi', 'Louis Fischer', 6, true),

-- Autoajuda
('Os 7 Hábitos das Pessoas Altamente Eficazes', 'Stephen R. Covey', 8, true),
('Como Fazer Amigos e Influenciar Pessoas', 'Dale Carnegie', 8, true),
('O Poder do Hábito', 'Charles Duhigg', 8, true),
('Mindset', 'Carol S. Dweck', 8, true),
('Atomic Habits', 'James Clear', 8, true),

-- Infantil
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 14, true),
('Alice no País das Maravilhas', 'Lewis Carroll', 14, true),
('Peter Pan', 'J.M. Barrie', 14, true),
('O Mágico de Oz', 'L. Frank Baum', 14, true),
('A Fantástica Fábrica de Chocolate', 'Roald Dahl', 14, true)
ON CONFLICT DO NOTHING;

-- Inserir empréstimos (usando IDs fixos para simplicidade)
INSERT INTO loans (user_id, book_id, loan_date, due_date, status) VALUES
(4, 1, '2024-11-15', '2024-12-15', 'active'),
(5, 2, '2024-11-10', '2024-12-10', 'active'),
(6, 3, '2024-11-20', '2024-12-20', 'overdue'),
(7, 4, '2024-11-05', '2024-12-05', 'returned'),
(8, 5, '2024-11-18', '2024-12-18', 'active'),
(9, 6, '2024-11-12', '2024-12-12', 'active'),
(10, 7, '2024-11-08', '2024-12-08', 'returned'),
(11, 8, '2024-11-22', '2024-12-22', 'active'),
(12, 9, '2024-11-14', '2024-12-14', 'overdue'),
(13, 10, '2024-11-16', '2024-12-16', 'active'),
(14, 11, '2024-11-11', '2024-12-11', 'returned'),
(15, 12, '2024-11-19', '2024-12-19', 'active'),
(16, 13, '2024-11-13', '2024-12-13', 'active'),
(17, 14, '2024-11-17', '2024-12-17', 'returned'),
(18, 15, '2024-11-21', '2024-12-21', 'active')
ON CONFLICT DO NOTHING;

-- Atualizar disponibilidade dos livros emprestados
UPDATE books SET available = false
WHERE id IN (
    SELECT book_id FROM loans WHERE status = 'active'
);

-- Inserir multas para empréstimos em atraso
INSERT INTO fines (user_id, loan_id, amount, due_date, status) VALUES
(6, 3, 25.00, '2024-12-20', 'pending'), -- 10 dias de atraso
(12, 9, 40.00, '2024-12-14', 'pending')  -- 16 dias de atraso
ON CONFLICT DO NOTHING;