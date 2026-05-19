import userModel from "../models/user.model.js";

// add product to user cart
const addToCart = async (req, res) => {
    try {

        const { userId, itemId, size } = req.body;

        if (!userId || !itemId || !size) {
            return res.status(400).json({ message: "Missing fields" });
        }   

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        await userModel.findByIdAndUpdate(userId, {cartData: cartData});

        res.status(200).json({message: "Item added to cart successfully"});

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.error(error);
    }
}


// update user cart
const updateCart = async (req, res) => {
    
    try {
        
        const { userId, itemId, size, quantity } = req.body;

        if (!userId || !itemId || !size || quantity === undefined) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            return res.status(400).json({ message: "Item not in cart" });
        }

        if (quantity === 0) {
            //  remove size
            delete cartData[itemId][size];

            //  if no sizes left → remove product
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

        } else {
        // normal update
        cartData[itemId][size] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, {cartData: cartData});

        res.status(200).json({message: "Item updated in cart successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.error(error);
    }
    
}


// get user cart
const getUserCart = async (req, res) => {

    try {
        
        const {userId} = req.body;
        const userData = await userModel.findById(userId);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        let cartData = userData.cartData;

        res.status(200).json({message: "User cart retrieved successfully", cartData});

    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.error(error);
    }
    
}



export {addToCart, updateCart, getUserCart}