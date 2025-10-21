import { Router } from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;