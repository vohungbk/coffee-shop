require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("../routes/auth");
const productRouter = require("../routes/product");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ugmo5c0.mongodb.net/?retryWrites=true&w=majority`);
    console.log("connect");
  } catch (error) {
    console.log("error", error);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is started at ${PORT}`));
