import moogoose from "mongoose";

const orderSchema = new moogoose.Schema({
    userId: { type: String, required: true },
    items: { type: Array, required: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "Order Placed", required: true },
    paymentMethod: { type: String, required: true },
    payment: { type: Boolean, default: false, required: true },
    date: { type: Date, required: true }
})

const orderModel = moogoose.models.order || moogoose.model("order", orderSchema);

export default orderModel;