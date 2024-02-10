import { Router } from "express";
import {
  createCategory,
  getAllCatigories,
} from "../controllers/categoryActions.js";

const router = Router();

router.route("/").post(createCategory).get(getAllCatigories);
