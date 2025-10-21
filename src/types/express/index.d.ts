// src/types/express/index.d.ts
import 'express';
import { User } from '../index';

declare global {
  namespace Express {
    interface Request {
      cookies: {
        token?: string;
      };
      user?: {
        email: string;
      };
    }
  }
}