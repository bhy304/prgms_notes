import { RowDataPacket } from 'mysql2';
import pool from '../db';

export interface Note extends RowDataPacket {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
}

export const NoteService = {
  async findOneById(id: number): Promise<Note | null> {
    const [rows] = await pool.execute<Note[]>('SELECT * FROM notes WHERE id = ?', [id]);
    return rows[0] || null;
  },
};
