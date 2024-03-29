import express from "express";
import {
  addCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses.js";
import advancedResults from "../middleware/advancedResults.js";
import Course from "../model/Course.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advancedResults(Course, { path: "bootcamp", select: "name description" }),
    getCourses
  )
  .post(addCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
