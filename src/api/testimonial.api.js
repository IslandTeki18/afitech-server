import express from "express";
const router = express.Router();

import {
    getAllTestimonials,
    getSingleTestimonial,
    createTestimonial,
    updateTestimonial,
    removeTestimonial,
} from "../services/testimonial.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router
    .route("/")
    .get(getAllTestimonials)
    .post(protect, admin, createTestimonial);
router
    .route("/:id")
    .get(getSingleTestimonial)
    .put(protect, admin, updateTestimonial)
    .delete(protect, admin, removeTestimonial);

export default router;
