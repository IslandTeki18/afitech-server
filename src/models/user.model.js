import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Can't be Blank"],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "Can't be Blank"],
            index: true,
        },
        password: {
            type: String,
            required: [true, "Password is required."],
        },
        bio: String,
        image: String,
        isAdmin: Boolean,
    },
    { timestamps: true }
);

UserSchema.pre("save", (next) => {
    let user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

const User = mongoose.model("User", UserSchema);
export default User;