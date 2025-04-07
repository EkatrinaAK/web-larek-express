import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import ConflictError from "../errors/conflict-error";
import BadRequestError from "../errors/bad-request-error";

export async function getProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let products;
  try {
    products = await Product.find({});
  } catch (err) {
    return next(new BadRequestError("Data base error"));
  }
  res.status(200).send({ items: products, total: products.length });
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { description, image, title, category, price } = req.body;

  try {
    const product = await Product.create({
      description,
      image,
      title,
      category,
      price,
    });
    res.status(200).send({ item: product });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("E11000")) {
        next(new ConflictError("Item with this title already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError(`Validation error: ${err.message}`));
      }
    }
    return next(err);
  }
}
