import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";


const createToken = (id) => {
    // In production, use JWT or similar for token generation
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1d"});
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).json({message: "User does not exist"});
        }

        // Check if the provided password matches the user's password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid email or password"});
        }

        const token = createToken(user._id);

        res.status(200).json({
            message: "User login successful",
            token
        });


    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({message: error.message});
    }

}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        
        const {name, email, password} = req.body;

        //checking if user already exists
        const userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        // valide email format and strong password
        if (!validator.isEmail(email)) {
            return res.status(400).json({message: "Invalid email format"});
        }
        if (password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = createToken(savedUser._id);

        res.status(201).json({
            message: "User registered successfully",
            token,
            // user: {
            //     id: savedUser._id,
            //     name: savedUser.name,
            //     email: savedUser.email
            // }
        });
        
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({message: error.message});
    }
}


// Route for Admin login
const adminLogin = async (req, res) => {
    try {
        
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            // const token = jwt.sign(email+password, process.env.JWT_SECRET);
            const token = jwt.sign(
                { email: process.env.ADMIN_EMAIL, role: "admin" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            return res.status(200).json({
                message: "Admin login successful",
                token
            });
        } else {
            return res.status(400).json({message: "Invalid admin credentials"});
        }
        
    } catch (error) {
        console.error("Error in adminLogin:", error);
        res.status(500).json({message: error.message});
    }
}

export {loginUser, registerUser, adminLogin};