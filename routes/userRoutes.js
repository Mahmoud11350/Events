import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userActions.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(registerUser).post(loginUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/current").get(authMiddleware, getCurrentUser);

export default router;
