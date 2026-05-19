import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongooseDB.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";

import dns from "dns";
// Force Node to use Google/Cloudflare DNS
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

connectDB();
connectCloudinary();

// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});