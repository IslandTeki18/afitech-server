import dotenv from "dotenv";
import users from "./tempdata/users.js";
import projects from "./tempdata/projects.js"
import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Project.deleteMany()
        await User.insertMany(users);
        await Project.insertMany(projects)
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
        await Project.deleteMany()
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
