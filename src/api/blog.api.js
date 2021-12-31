import express from "express";
const router = express.Router();
import {
  getAllBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  publishBlog,
  removeBlog,
} from "../services/blog.service.js";
import { protect, admin } from "../middleware/auth.middleware.js";

router.route("/").get(getAllBlogs).post(protect, admin, createBlog);
router
  .route("/:id")
  .get(getSingleBlog)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, removeBlog);
router.put("/:id/publish", protect, admin, publishBlog);

export default router;
