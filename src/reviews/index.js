import express from "express";
import createHttpError from "http-errors";
import UsersModel from "../users/model.js";
import ReviewsModel from "./model.js";

const reviewsRouter = express.Router();

reviewsRouter.post("/:productId/reviews", async (req, res, next) => {
  try {
    const { reviewId } = await ReviewsModel.create({
      ...req.body,
      productId: req.params.productId,
    });
    res.status(201).send({ reviewId });
  } catch (error) {
    next(error);
  }
});

reviewsRouter.get("/:productId/reviews", async (req, res, next) => {
  try {
    const reviews = await ReviewsModel.findAll({
      where: { productId: req.params.productId },
      include: [{ model: UsersModel, attributes: ["firstName", "lastName"] }],
    });
    res.send(reviews);
  } catch (error) {
    next(error);
  }
});

reviewsRouter.put("/:productId/reviews/:reviewId", async (req, res, next) => {
  try {
    const [numberOfUpdatedRows, updatedRows] = await ReviewsModel.update(
      req.body,
      { where: { reviewId: req.params.reviewId }, returning: true }
    );
    if (numberOfUpdatedRows === 1) {
      res.send(updatedRows[0]);
    } else {
      next(
        createHttpError(
          404,
          `Review with id ${req.params.reviewId} was not found!`
        )
      );
    }
  } catch (error) {
    next(error);
  }
});

reviewsRouter.delete(
  "/:productId/reviews/:reviewId",
  async (req, res, next) => {
    try {
      const numberOfDeletedReviews = await ReviewsModel.destroy({
        where: { reviewId: req.params.reviewId },
      });
      if (numberOfDeletedReviews === 1) {
        res.status(204).send();
      } else {
        next(
          createHttpError(
            404,
            `Review with id ${req.params.reviewId} was not found!`
          )
        );
      }
    } catch (error) {
      next(error);
    }
  }
);

export default reviewsRouter;
