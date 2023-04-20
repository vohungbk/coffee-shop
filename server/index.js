require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const stripeRouter = require("./routes/stripe");

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ugmo5c0.mongodb.net/?retryWrites=true&w=majority`);
  } catch (error) {
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE", preflightContinue: false, optionsSuccessStatus: 204 }));
app.get("/api/test", (req, res) => {
  res.json("test OK");
});

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/stripe", stripeRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is started at ${PORT}`));
