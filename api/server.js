"use strict";
import morgan from "morgan";
import bodyParser from "body-parser";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./_helpers/sample.helpers.js";
import router from "./routes/sample.route.js";

dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(router);

app.listen(5000, ()=> console.log('Server running at port 5000'));