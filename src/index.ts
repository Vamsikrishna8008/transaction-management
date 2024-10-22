import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import connectDB from "./db";
import cors from "cors";
import TransactionRouter from "../src/controllers/transactionController";
import CategoriesRouter from "../src/controllers/categoryController";

// Initialize Express
const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// MongoDB Connection
// const MONGO_URI = "your_mongodb_connection_string";
// mongoose
//   .connect(MONGO_URI)
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch((error) => console.log("MongoDB connection error:", error));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

//Routing
app.use("/api/transactions", TransactionRouter);
app.use("/api/categories", CategoriesRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
