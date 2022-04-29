import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/error.middleware.js";
import userRoutes from "./src/api/user.api.js";
import projectRoutes from "./src/api/project.api.js";
import blogRoutes from "./src/api/blog.api.js";
import serviceRoutes from "./src/api/service.api.js";
import testimonialRoutes from "./src/api/testimonial.api.js";
import employeeRoutes from "./src/api/employee.api.js";

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/employees", employeeRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
