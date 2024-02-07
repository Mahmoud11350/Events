import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userActions.js";

const router = Router();

router.route("/register").post(registerUser).post(loginUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
