import express from "express";
const router = express.Router();
import {
    getAllService,
    getSingleService,
    createAService,
    updateAService,
    removeService,
} from "../services/service.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").get(getAllService).post(protect, admin, createAService);
router
    .route("/:id")
    .get(getSingleService)
    .put(protect, admin, updateAService)
    .delete(protect, admin, removeService);

export default router;
