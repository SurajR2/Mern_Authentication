import express from "express";

const router = express.Router();

import { login, signup, logout } from "../controllers/auth.controller.js";
import {
  checkAuth,
  verifyEmail,
} from "../controllers/verification.controller.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/password.controller.js";
import { verifyUserToken } from "../middlewares/verifyUserToken.js";

//authentication routes
router.get("/check-auth", verifyUserToken, checkAuth);
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/logout", logout);
//

export default router;
