import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ReviewsModel = sequelize.define("review", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  content: {
    type: DataTypes.STRING(),
  },
});

export default ReviewsModel;
