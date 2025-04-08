import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export default async function orderProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { total, items } = req.body;
    const products = await Product.find({ _id: { $in: items } });
    if (products.length === 0) {
      throw (new BadRequestError('Empty cart'));
    }
    const filteredProducts = products.filter((product) => product.price !== null);
    const totalSum = filteredProducts.reduce(
      (acc, product) => acc + product.price,
      0,
    );
    if (filteredProducts.length !== items.length) {
      throw new BadRequestError('Wrong order');
    }
    if (totalSum !== total) {
      throw new BadRequestError('Wrong total sum');
    }
    return res.status(200).send({ id: faker.string.uuid(), total: totalSum });
  } catch (err) {
    return next(err);
  }
}
