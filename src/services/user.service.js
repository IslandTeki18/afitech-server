import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";

//@desc     Get Auth User and Token
//@route    POST /api/users/sign-in
//@access   Public
const loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) res.status(404).send({ msg: "User not found." });
        if (user && (await user.matchPassword(req.body.password))) {
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
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Get Admin Profile
//@route    GET /api/users/profile
//@access   Private
const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) res.status(404).send({ msg: "User not found." });
        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                isAdmin: user.isAdmin,
            });
        }
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

//@desc     Update User Settings
//@route    PUT /api/users/profile/settings
//@access   Private/Admin
const updateUserSettings = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) res.status(404).send({ msg: "User not found." });
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
    } catch (error) {
        res.status(500);
        return next(error);
    }
};

export { loginUser, getUserProfile, updateUserSettings };
