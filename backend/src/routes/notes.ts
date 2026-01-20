import express, { Response } from 'express';
import { authenticateToken, authorizeNote, AuthRequest } from '../middleware/auth';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Routing works!' });
});

router.get('/:id', authenticateToken, authorizeNote, async (req: AuthRequest, res: Response) => {
  const note = req.note!;
  return res.json(note);
});

export default router;
