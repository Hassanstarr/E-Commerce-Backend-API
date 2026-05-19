import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

import Stripe from "stripe";
// import Razorpay from "razorpay";

// gobal varaibles
const currency = "USD";
const deliveryCharge = 10; 

// GATEWAY initialization
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// Placing order using COD(Cash on Delivery) Method
const placeOrder = async (req, res) => {
    
    try {
        
        const { userId, items, amount, address } = req.body;

        // Create a new order object
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: new Date()
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cardData: {}});

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
        
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order", error: error.message });
    }
    
}


// Placing order using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {

    const { userId, items, amount, address } = req.body;
    // const origin = req.headers.origin;
    const origin = process.env.CLIENT_URL;
 
    const orderData = {
        userId,
        items,
        amount,
        address,
        paymentMethod: "Stripe",
        payment: false,
        date: new Date()
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    
    const line_items = items.map((item) => ({
        price_data: {
            currency: currency,
            product_data: {
                name: item.name,
            },
            unit_amount: item.price * 100, // Stripe expects amount in cents
        },
        quantity: item.quantity,
    }))

    line_items.push({
        price_data: {
            currency: currency,
            product_data: {
                name: "Delivery Charges",
            },
            unit_amount: deliveryCharge * 100,
        },
        quantity: 1,

    });

    const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&order_id=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&order_id=${newOrder._id}`,
        line_items,
        mode: "payment",
    })

    res.status(201).json({ message: "Order placed successfully", order: newOrder, sessionId: session.url });
    
    } catch (error) {
        console.error("Error placing order with Stripe:", error);
        res.status(500).json({ message: "Failed to place order with Stripe", error: error.message });
    }
}


// All order data for admin
const allOrders = async (req, res) => {

    try {

        const orders = await orderModel.find({}).sort({ Date: -1 });
        res.status(200).json({ orders });
        
    } catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(500).json({ message: "Failed to fetch all orders", error: error.message });
    }
    
}

// User order for frontend
const userOrders = async (req, res) => {

    try {

        const { userId } = req.body;
    
        const orders = await orderModel.find({ userId }).sort({ Date: -1 });
        res.status(200).json({ orders });
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: "Failed to fetch user orders", error: error.message });
    }
    
}

// update order status from admin Panel
const updateOrderStatus = async (req, res) => {

    try {
        
        const { orderId, status } = req.body;

        await orderModel.findByIdAndUpdate(orderId, { status });
        res.status(200).json({ message: "Order status updated successfully" });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to update order status", error: error.message });
        console.error("Error updating order status:", error);
    }
    
}

export { placeOrder, placeOrderStripe, allOrders, userOrders, updateOrderStatus }