import express from "express";
import createHttpError from "http-errors";
import ReviewsModel from "./model.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const { review } = await ReviewsModel.create({
      ...req.body,
      productId: req.params.productId,
    });
    res.status(201).send({ review });
  } catch (error) {
    next(error);
  }
});

export default reviewsRouter;
