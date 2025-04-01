import orderProduct from "../controllers/order";
import { Router } from "express";

const router = Router();

router.post("/order", orderProduct);

export default router;