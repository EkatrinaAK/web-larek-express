import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { createProduct, getProducts } from '../controllers/products';
import { validateProduct } from '../middeleweres/validation';

const router = Router();

const productRouteValidator = celebrate({
  [Segments.BODY]: validateProduct,
});

router.get('/product', getProducts);
router.post('/product', productRouteValidator, createProduct);

export default router;
