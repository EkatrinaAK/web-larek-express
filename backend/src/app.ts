import express from 'express';
import mongoose from 'mongoose';

const { PORT = "http://localhost/api", DB_ADDRESS = "mongodb://root:example@mongo:27017/"} = process.env;
const cors = require("cors");

const app= express();
app.use(cors());

mongoose.connect(DB_ADDRESS);


app.listen (PORT, ()=>{
    console.log ('port 3000')
})