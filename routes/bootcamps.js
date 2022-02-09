import express from "express";
import {
  bootcampPhotoUpload,
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  updateBootcamp,
} from "../controllers/bootcamps.js";
import Bootcamp from "../model/Bootcamp.js";
import imgUploader from "../utils/imgUploader.js";

const router = express.Router();

import advancedResults from "../middleware/advancedResults.js";
import { protect, authorize } from "../middleware/auth.js";

// Include other resource routers
import courseRouter from "./courses.js";
import reviewRouter from "./reviews.js";

// Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

router
  .route("/:id/photo")
  .put(
    protect,
    authorize("publisher", "admin"),
    imgUploader.single("image"),
    bootcampPhotoUpload
  );

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

export default router;
