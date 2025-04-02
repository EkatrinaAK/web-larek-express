import express from "express";
import mongoose from "mongoose";
import productsRouter from "./routes/product";
import orderRouter from "./routes/order";
import path from "path";
import { DB_ADDRESS, PORT } from "./config";
import errorHandler from "./middeleweres/error-handler";
import { errors } from "celebrate";

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(DB_ADDRESS);

app.use(productsRouter);
app.use(orderRouter);

app.use(express.static(path.join(__dirname, "public")));

app.use(errors());
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});