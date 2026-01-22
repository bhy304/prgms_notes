import mysql from 'mysql2/promise';
import { DB_PORT } from './settings';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
