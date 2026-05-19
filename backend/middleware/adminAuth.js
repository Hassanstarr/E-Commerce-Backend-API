import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        
        const {token} = req.headers;
        if(!token){
            return res.status(401).json({message: "Not Authorized Login again"});
        }

        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({message: "Not Authorized Login again"});
        }

        next();
    } catch (error) {
        console.error("Error in adminAuth middleware:", error);
        res.status(401).json({message: "Not Authorized Login again"});
    }
}

export default adminAuth;
