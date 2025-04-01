import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

export async function getProducts(req: Request, res: Response) {
  const products = await Product.find({});
  res.status(200).send({ items: products, total: products.length });
}

export async function createProduct(req: Request, res: Response) {
  const { description, image, title, category, price } = req.body;

  const product = await Product.create({
    description,
    image,
    title,
    category,
    price,
  });
  res.status(200).send({ item: product });
}
