import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    cartData: {type: Object, default: {}},

}, {minimize: false}) // minimize: false => to store empty objects in MongoDB

// mongoose.model.user => if the model already exists, use it. Otherwise, create a new model.

const userModel = mongoose.model.user || mongoose.model("user", userSchema);

export default userModel;