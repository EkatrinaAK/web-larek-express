import { Request, Response } from "express";
import Product from "../models/product";
import { faker } from "@faker-js/faker";
import BadRequestError from "../errors/bad-request-error";

export const orderProduct = async (req: Request, res: Response) => {
  const { total, items } = req.body;

  let products;

  try {
    products = await Product.find({ _id: { $in: items } });
  } catch (err) {
    throw new BadRequestError("Data base error");
  }
  if (products.length === 0) {
    throw new BadRequestError("Empty cart");
  }

  const filteredProducts = products.filter((product) => product.price !== null);
  const totalSum = filteredProducts.reduce(
    (acc, product) => acc + product.price,
    0
  );

  if (filteredProducts.length !== items.length) {
    throw new BadRequestError("Wrong order");
  }
  if (totalSum !== total) {
    throw new BadRequestError("Wrong total sum");
  }

  return res.status(200).send({ id: faker.string.uuid(), total: totalSum });
};

export default orderProduct;
