import { NextFunction, Request, Response } from "express";
import Product from "../models/product";
import { faker } from "@faker-js/faker";

export const orderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { total, items } = req.body;

  try {
    const products = await Product.find({ _id: { $in: items } });

    const filteredProducts = products.filter(
      (product) => product.price !== null
    );

    if (products.length === 0) {
      throw new Error("Empty order");
    }

    if (filteredProducts.length !== items.length) {
      throw new Error("Wrong order");
    }

    const totalSum = filteredProducts.reduce(
      (acc, product) => acc + product.price,
      0
    );

    if (totalSum !== total) {
      throw new Error("Wrong total sum");
    }

    return res.status(200).send({ id: faker.string.uuid(), total: totalSum });
  } catch (err) {
    console.error(err);
  }
};

export default orderProduct;
