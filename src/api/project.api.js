import express from "express";
const router = express.Router();
import {
    getAllProjects,
    getSingleProject,
    updateProject,
    createProject,
    removeProject,
} from "../services/project.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").get(getAllProjects).post(protect, admin, createProject);
router
    .route("/:id")
    .get(getSingleProject)
    .put(protect, admin, updateProject)
    .delete(protect, admin, removeProject);

export default router;
