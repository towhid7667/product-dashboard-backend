import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const DEMO_USER = {
  email: 'demo@demo.com',
  password: 'demo112233'
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (email !== DEMO_USER.email) {
      res.status(401).json({ message: 'Invalid credentials' });

      return;
    }

    if (password !== DEMO_USER.password) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({
      message: 'Login successful',
      user: { email },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = (req: Request, res: Response): void => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
};

export const verifyAuth = (req: Request, res: Response): void => {
  res.json({ authenticated: true, user: req.user });
};