import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import UsersModel from "../users/model.js";

const ReviewsModel = sequelize.define("review", {
  reviewId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.STRING(),
  },
});

UsersModel.hasMany(ReviewsModel, {
  foreignKey: { name: "userId", allowNull: true },
});
ReviewsModel.belongsTo(UsersModel, {
  foreignKey: { name: "userId", allowNull: true },
});

export default ReviewsModel;
