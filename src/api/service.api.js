import express from "express";
const router = express.Router();
import {
    getAllService,
    getSingleService,
    createService,
    createServiceFeature,
    updateAService,
    updateServiceFeature,
    removeService,
    removeServiceFeature,
} from "../services/service.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").get(getAllService).post(protect, admin, createService);
router
    .route("/:id")
    .get(getSingleService)
    .put(protect, admin, updateAService)
    .delete(protect, admin, removeService);
router.post("/:id/feature", protect, admin, createServiceFeature);
router.delete("/:id/:feature_id", protect, admin, removeServiceFeature);
router.put("/:id/update", protect, admin, updateServiceFeature);
export default router;
