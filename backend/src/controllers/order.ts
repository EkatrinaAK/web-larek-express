import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { faker } from "@faker-js/faker";
import BadRequestError from "../errors/bad-request-error";

export async function orderProduct (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { total, items } = req.body;

  let products;

  try {
    products = await Product.find({ _id: { $in: items } });
  } catch (err) {
    return next(new BadRequestError("Data base error"));
  }
  if (products.length === 0) {
    return next (new BadRequestError("Empty cart"));
  }

  const filteredProducts = products.filter((product) => product.price !== null);
  const totalSum = filteredProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  if (filteredProducts.length !== items.length) {
    return next (new BadRequestError("Wrong order"));
  }
  if (totalSum !== total) {
    return next (new BadRequestError("Wrong total sum"));
  }

  return res.status(200).send({ id: faker.string.uuid(), total: totalSum });
};

export default orderProduct;
