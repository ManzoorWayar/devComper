import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import bootcampRoutes from "./routes/bootcamps.js";
import courseRoutes from "./routes/courses.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import reviewsRoutes from "./routes/reviews.js";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

const __dirname = dirname(fileURLToPath(import.meta.url));
// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/reviews", reviewsRoutes);

// Error Handling Middlewares
app.use(errorHandler);

const PORT = process.env.PORT | 5001;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
