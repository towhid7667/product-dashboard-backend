import { Router } from 'express';
import { login, logout, verifyAuth } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/verify', authMiddleware, verifyAuth);

export default router;