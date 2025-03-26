import express from 'express';
import mongoose from 'mongoose';
import productsRouter from "./routes/product";
import path from "path";

const { PORT = 3000, DB_ADDRESS = "mongodb://127.0.0.1:27017/"} = process.env;
const cors = require("cors");

const app= express();
app.use(cors());

mongoose.connect (DB_ADDRESS);

app.use(productsRouter);
app.use(express.static(path.join(__dirname, "public")));

app.listen (PORT, ()=>{
    console.log (`Listening on port ${PORT}`)
})