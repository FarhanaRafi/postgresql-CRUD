import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./model.js";

const productsRouter = express.Router();

productsRouter.post("/", async (req, res, next) => {
  try {
    const { productId } = await ProductsModel.create(req.body);
    res.status(201).send({ productId });
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await ProductsModel.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:productId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

export default productsRouter;
