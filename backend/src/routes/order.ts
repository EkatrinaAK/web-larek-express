import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import { validateOrder } from '../middeleweres/validation';
import orderProduct from '../controllers/order';

const router = Router();

const orderRouteValidator = celebrate({
  [Segments.BODY]: validateOrder,
});

router.post('/order', orderRouteValidator, orderProduct);

export default router;
