import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Note, NoteService } from '../models/Note';
import { JWT_SECRET } from '../settings';

export interface AuthRequest extends Request {
  user?: {
    email: string;
    id: number;
  };
  note?: Note;
}

export const authenticateToken = (req: AuthRequest, res: Response, _next: NextFunction) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    req.user = {
      email: decoded.email as string,
      id: decoded.id as number,
    };
    _next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeNote = async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { id } = req.params;
  const noteId = parseInt(Array.isArray(id) ? id[0] : id);

  if (isNaN(noteId)) {
    return res.status(400).json({ message: 'Invalid note ID' });
  }

  const note = await NoteService.findOneById(noteId);

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (note.user_id !== req.user?.id) {
    return res.status(403).json({ message: 'You do not have permission to access this note' });
  }

  req.note = note;
  _next();
};
