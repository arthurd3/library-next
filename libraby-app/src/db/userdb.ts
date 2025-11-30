import { User } from '@/src/models/UserModel';
import pool from './connection/db';

export class UserDao {

  static async getUserByEmail(email: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      throw error;
    }
  }

  static async getUserById(id: number): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  }

  static async getUserByRegistration(registration: string): Promise<User | null> {
    try {
      const query = 'SELECT * FROM users WHERE registration = $1';
      const result = await pool.query(query, [registration]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao buscar usuário por matrícula:', error);
      throw error;
      throw error;
    }
  }

  static async getAllUsers(): Promise<User[]> {
    try {
      const query = 'SELECT * FROM users ORDER BY name';
      const result = await pool.query(query);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      throw error;
    }
  }

  static async createUser(name: string, email: string, password: string, registration: string, phone?: string, address?: string, roleId: number = 3): Promise<User> {
    try {
      const query = 'INSERT INTO users (name, email, password, registration, phone, address, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
      const result = await pool.query(query, [name, email, password, registration, phone, address, roleId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  static async updateUser(id: number, name: string, email: string, registration: string, phone?: string, address?: string): Promise<User | null> {
    try {
      const query = 'UPDATE users SET name = $1, email = $2, registration = $3, phone = $4, address = $5 WHERE id = $6 RETURNING *';
      const result = await pool.query(query, [name, email, registration, phone, address, id]);
      return result.rows[0] || null;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await pool.query(query, [id]);
      return (result.rowCount ?? 0) > 0;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }
}