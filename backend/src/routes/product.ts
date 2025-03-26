import { createProduct, getProducts } from "../controllers/products";
import { Router } from "express";

const router = Router();

router.get("/product", getProducts);
router.post("/product", createProduct);

export default router;