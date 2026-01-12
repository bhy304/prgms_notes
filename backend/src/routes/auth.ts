import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '../models/User';
import { isQueryError } from '../utils';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  try {
    await UserService.create({ email, password });
    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    if (isQueryError(error) && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'User already exists' });
    }
    throw error;
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UserService.findOneByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password!))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign({ email: user.email, id: user.id }, JWT_SECRET, {
    expiresIn: '14d',
  });

  res.cookie('accessToken', accessToken, {
    maxAge: 1000 * 60 * 60 * 24 * 14,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  return res.status(204).json({ message: 'Login successful' });
});

export default router;
