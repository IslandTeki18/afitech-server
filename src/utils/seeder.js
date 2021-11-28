import dotenv from "dotenv";
import users from "./tempdata.users.js";
import User from "../models/user.model.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await User.insertMany(users);
        console.log("Data Import Successful!");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        console.log("Data Destroyed.");
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
