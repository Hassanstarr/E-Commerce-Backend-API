import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus } from '../controllers/order.controller.js';
import authUser from '../middleware/auth.js';
import authAdmin from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// orderRouter.post("/place", placeOrder);
// orderRouter.post("/place/stripe", placeOrderStripe);
// orderRouter.post("/place/razorpay", placeOrderRazorpay);
// orderRouter.get("/all", allOrders);
// orderRouter.get("/user", userOrders);
// orderRouter.put("/update-status/:id", updateOrderStatus);

// Admin Feature
orderRouter.post("/all", authAdmin, allOrders);
orderRouter.post("/status", updateOrderStatus);

// Payment Method
orderRouter.post("/place",authUser, placeOrder);
orderRouter.post("/stripe",authUser, placeOrderStripe);

// User Feature
orderRouter.post("/userorders", authUser, userOrders);

export default orderRouter;