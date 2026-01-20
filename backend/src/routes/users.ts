import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/me', authenticateToken, (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not found' });
  }
  return res.status(200).json(req.user);
});

export default router;
