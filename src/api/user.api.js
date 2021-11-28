import express from "express";
const router = express.Router();
import {
    loginUser,
    updateUserSettings,
    getUserProfile,
} from "../services/user.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.post("/sign-in", loginUser);
router
    .route("/settings")
    .put(protect, admin, updateUserSettings)
    .get(protect, admin, getUserProfile);

export default router;