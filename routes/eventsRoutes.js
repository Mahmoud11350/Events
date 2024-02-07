import { Router } from "express";
import { createEvent, deleteEvent, getAllEvents, getEvent, updateEvent } from "../controllers/eventActions.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router()

router.route("/").post(authMiddleware,createEvent).get(getAllEvents)
router.route("/:id").get(getEvent).patch(authMiddleware,updateEvent).delete(authMiddleware,deleteEvent)

export default router
