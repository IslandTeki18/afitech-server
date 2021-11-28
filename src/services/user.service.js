import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//@desc     Get Auth User and Token
//@route    GET /api/users/login
//@access   Public
const getUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            password: user.password,
            bio: user.bio,
            image: user.image,
            isAdmin: user.idAdmin,
            token: generateToken(user._id),
        });
    }
    if (!user) {
        res.status(401);
        throw new Error("Invalid Username or Password");
    }
};

//@desc     Get Admin Profile
//@route    GET /api/users/profile
//@access   Private
const getAdminProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
        });
    }
};

//@desc     Update User Settings
//@route    PUT /api/users/profile/settings
//@access   Private/Admin
const putUserSettings = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        res.status(404);
        throw new Error("User not found.");
    }
    if (user) {
        user.username = req.body.username || user.username;
        if (req.body.password) user.password = req.body.password;
        const updatedAdmin = await user.save();

        res.json({
            _id: updatedAdmin._id,
            username: updatedAdmin.username,
            email: updatedAdmin.email,
            bio: updatedAdmin.bio,
            image: updatedAdmin.image,
            isAdmin: updatedAdmin.isAdmin,
            token: generateToken(updatedAdmin._id),
        });
    }
};

export { getUser, getAdminProfile, putUserSettings };
