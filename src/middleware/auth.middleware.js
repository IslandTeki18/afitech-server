import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
    let token;
    if (!token) {
        res.status(401);
        throw new Error("Not Authorized, No Token");
    }
    if (
        req.headers.authorization &&
        req.headers.autorication.startsWith("Bearer")
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
};

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) return next();
    res.status(401);
    throw new Error("Not authorized, contact admin");
};

export { protect, admin };
