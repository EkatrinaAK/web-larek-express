import { Request, Response } from "express";
import Product from "../models/product";
import ConflictError from "../errors/conflict-error";

export async function getProducts(req: Request, res: Response) {
  const products = await Product.find({});
  res.status(200).send({ items: products, total: products.length });
  
}

export async function createProduct(req: Request, res: Response) {
  const { description, image, title, category, price } = req.body;

  try{
    const product = await Product.create({
      description,
      image,
      title,
      category,
      price,
    });
    res.status(200).send({ item: product});
  }

  catch (err) {
    if (err instanceof Error && err.message.includes("E11000")) {
     throw new ConflictError("Item with this title already exists");
    }
  }
}
