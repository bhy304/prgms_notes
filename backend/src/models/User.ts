import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../db';
import bcrypt from 'bcrypt';

export interface User extends RowDataPacket {
  id: number;
  email: string;
  encrypted_password?: string;
}

export const UserService = {
  async create({ email, password }: { email: string; password?: string }) {
    const hashedPassword = await bcrypt.hash(password!, 10);
    const [result] = await pool.execute<ResultSetHeader>(
      'INSERT INTO users (email, encrypted_password) VALUES (?, ?)',
      [email, hashedPassword],
    );
    return result;
  },

  async findOneByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute<User[]>('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },
};
