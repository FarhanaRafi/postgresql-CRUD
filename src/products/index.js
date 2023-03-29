import express from "express";
import createHttpError from "http-errors";
import ProductsModel from "./model.js";
import { Op } from "sequelize";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

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
    const query = {};
    if (req.query.minPrice && req.query.maxPrice)
      query.price = { [Op.between]: [req.query.minPrice, req.query.maxPrice] };
    if (req.query.category)
      query.category = { [Op.iLike]: `%${req.query.category}%` };
    if (req.query.filter)
      query[Op.or] = [
        { name: { [Op.iLike]: `%${req.query.filter}%` } },
        { description: { [Op.iLike]: `%${req.query.filter}%` } },
      ];
    const products = await ProductsModel.findAndCountAll({
      where: {
        ...query,
        // ...(req.query.filter && {
        //   [Op.or]: [
        //     { name: { [Op.iLike]: `%${req.query.filter}%` } },
        //     { description: { [Op.iLike]: `%${req.query.filter}%` } },
        //   ],
        // }),
      },
      ...(req.query.limit && { limit: req.query.limit }),
      ...(req.query.offset && { offset: req.query.offset }),
      order: [["name", "ASC"]],
    });
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await ProductsModel.findByPk(req.params.productId, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    if (product) {
      res.send(product);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.put("/:productId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRecords] = await ProductsModel.update(
      req.body,
      { where: { productId: req.params.productId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRecords[0]);
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});
productsRouter.delete("/:productId", async (req, res, next) => {
  try {
    const numberOfDeletedRows = await ProductsModel.destroy({
      where: { productId: req.params.productId },
    });
    if (numberOfDeletedRows === 1) {
      res.status(204).send();
    } else {
      next(
        createHttpError(
          404,
          `Product with id ${req.params.productId} not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

const cloudinaryUploader = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "BE-PDB/products",
    },
  }),
}).single("cover");

productsRouter.post(
  "/:productId/uploadCover",
  cloudinaryUploader,
  async (req, res, next) => {
    try {
      console.log(req.file, "req file");
      const product = await ProductsModel.findByPk(req.params.productId);
      product.imageUrl = req.file.path;
      await product.save();
      if (product) {
        res.send({ message: "File uploaded successfully" });
      } else {
        next(
          createHttpError(
            404,
            `Product with id ${req.params.productId} not found`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default productsRouter;
