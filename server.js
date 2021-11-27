import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/auth.middleware.js";

dotenv.config();
connectDB();
const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
