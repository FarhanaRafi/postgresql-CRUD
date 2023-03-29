import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
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

export default ProductsModel;
