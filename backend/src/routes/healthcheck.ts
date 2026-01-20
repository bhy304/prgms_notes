import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.sendStatus(204);
});

export default router;
