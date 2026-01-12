import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CORS_ALLOWED_ORIGIN } from './settings';
import authRouter from './routes/auth';
import notesRouter from './routes/notes';

const app = express();

app.use(
  cors({
    origin: CORS_ALLOWED_ORIGIN,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.sendStatus(500);
});

export default app;
