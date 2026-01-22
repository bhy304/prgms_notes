import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 3031;
export const CORS_ALLOWED_ORIGIN = process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:5173';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
export const DB_PORT = parseInt(process.env.DB_PORT || '3306');
