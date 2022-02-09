import express from "express";
import {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updateDetails,
} from "../controllers/auth.js";

const router = express.Router();

import { protect } from "../middleware/auth.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:resettoken", resetPassword);

export default router;
