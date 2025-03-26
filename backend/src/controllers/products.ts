import { NextFunction, Request, Response } from "express";
import Product from "../models/product";

export const getProducts = (req: Request, res: Response, next: NextFunction) =>
    Product.find({})
      .then((products) =>
        res.status(200).send({items: products, total: products.length })
      )
      .catch((err) => console.error(err));

      export const createProduct = (
        req: Request,
        res: Response,
        next: NextFunction
      ) => {
        const { description, image, title, category, price } = req.body;
      
        return Product.create({ description, image, title, category, price }).then(
          (product) => res.status(200).send({ item: product })
        );
      };