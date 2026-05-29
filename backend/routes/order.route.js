import express from 'express';
import { placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus } from '../controllers/order.controller.js';
import authUser from '../middleware/auth.js';
import authAdmin from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// Admin Feature
orderRouter.get("/all", authAdmin, allOrders);
orderRouter.put("/status", authAdmin, updateOrderStatus);

// Payment Method
orderRouter.post("/place",authUser, placeOrder);
orderRouter.post("/stripe",authUser, placeOrderStripe);

// User Feature
orderRouter.get("/userorders", authUser, userOrders);

export default orderRouter;