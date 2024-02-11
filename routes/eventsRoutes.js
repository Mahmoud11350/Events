import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEvent,
  updateEvent,
} from "../controllers/eventActions.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { uploadImage } from "../utils/uploadImage.js";

const router = Router();

router.route("/").post(authMiddleware, createEvent).get(getAllEvents);
router.route("/image-upload").post(authMiddleware, uploadImage);
router
  .route("/:id")
  .get(getEvent)
  .patch(authMiddleware, updateEvent)
  .delete(authMiddleware, deleteEvent);

export default router;
