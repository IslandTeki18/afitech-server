import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_TOKEN);
                req.user = await User.findById(decoded.id).select("-password");
                next();
            } catch (error) {
                console.error(error);
                res.status(401);
                throw new Error("Not authorized, token failed");
            }
        }
        if (!token) {
            res.status(401);
            throw new Error("Not Authorized, No Token");
        }
    } catch (error) {
        return next(error);
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();
    res.status(401);
    throw new Error("Not authorized, contact admin");
};

export { protect, admin };
