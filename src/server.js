import Express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import { pgConnect } from "./db.js";
import {
  badRequestHandler,
  unauthorizedHandler,
  notfoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import productsRouter from "./products/index.js";
import categoriesRouter from "./categories/index.js";
import usersRouter from "./users/index.js";
import reviewsRouter from "./reviews/index.js";

const server = Express();
const port = process.env.PORT || 3009;

server.use(cors());
server.use(Express.json());

server.use("/products", productsRouter);
server.use("/categories", categoriesRouter);
server.use("/users", usersRouter);
server.use("/products", reviewsRouter);

server.use(badRequestHandler);
server.use(notfoundHandler);
server.use(unauthorizedHandler);
server.use(genericErrorHandler);

await pgConnect();

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
