import express from "express";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.js";
import Course from "../model/Course.js";

const router = express.Router({ mergeParams: true });

import advancedResults from "../middleware/advancedResults.js";
import { protect, authorize } from "../middleware/auth.js";

router
  .route("/")
  .get(
    advancedResults(Course, { path: "bootcamp", select: "name description" }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addCourse);

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);

export default router;
