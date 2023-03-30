import { DataTypes } from "sequelize";
import CategoriesModel from "../categories/model.js";
import sequelize from "../db.js";
import ProductsCategoriesModel from "./productsCategoriesModel.js";
import ReviewsModel from "../reviews/model.js";

const ProductsModel = sequelize.define("product", {
  productId: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  //   category: {
  //     type: DataTypes.STRING(50),
  //     allowNull: false,
  //   },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue:
      "https://res.cloudinary.com/dgfcfb0rr/image/upload/v1679050140/BE-DB/marketPlace/l6dtx2vynowveank1tmn.jpg",
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ProductsModel.belongsToMany(CategoriesModel, {
  through: ProductsCategoriesModel,
  foreignKey: { name: "productId", allowNull: false },
});
CategoriesModel.belongsToMany(ProductsModel, {
  through: ProductsCategoriesModel,
  foreignKey: { name: "categoryId", allowNull: false },
});

ProductsModel.hasMany(ReviewsModel, {
  foreignKey: { name: "productId", allowNull: true },
});
ReviewsModel.belongsTo(ProductsModel, {
  foreignKey: { name: "productId", allowNull: true },
});

export default ProductsModel;
