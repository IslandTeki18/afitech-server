import express from "express";
const router = express.Router();
import {
    getAllEmployee,
    getSingleEmployee,
    createEmployee,
    updateAnEmployee,
    removeEmployee,
} from "../services/employee.service.js";
import { admin, protect } from "../middleware/auth.middleware.js";

router.route("/").get(getAllEmployee).post(protect, admin, createEmployee);
router
    .route("/:id")
    .get(getSingleEmployee)
    .put(protect, admin, updateAnEmployee)
    .delete(protect, admin, removeEmployee);

export default router;
