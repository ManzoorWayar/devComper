import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
import bootcampRoutes from "./routes/bootcamps.js";
import courseRoutes from "./routes/courses.js";

const app = express();

// Body parser
app.use(express.json());

// Cookie parser

// Mount routers
app.use("/api/v1/bootcamps", bootcampRoutes);
app.use("/api/v1/courses", courseRoutes);

// Error Handling Middlewares
app.use(errorHandler);

const PORT = process.env.PORT | 5001;

app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
