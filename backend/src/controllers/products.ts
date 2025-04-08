import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export async function getProducts(
  _: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const products = await Product.find({});
    return res.status(200).send({ items: products, total: products.length });
  } catch (err) {
    return next(err);
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    description, image, title, category, price,
  } = req.body;
  try {
    const product = await Product.create({
      description,
      image,
      title,
      category,
      price,
    });
    return res.status(200).send({ item: product });
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes('E11000')) {
        return next(new ConflictError('Item with this title already exists'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Validation error: ${err.message}`));
      }
    }
    return next(err);
  }
}
