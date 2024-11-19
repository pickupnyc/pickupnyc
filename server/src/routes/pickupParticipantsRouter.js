import express from "express";
import {
    getAllPickupParticipants,
    createPickupParticipant,
    deletePickupParticipant,
    isUserRegistered,
} from "../controllers/pickupParticipantsController.js";

const router = express.Router();

router.get("/:pickup_id", getAllPickupParticipants);

router.get("/check-registration/:pickup_id/:user_id", isUserRegistered);

router.post("/", createPickupParticipant);

router.delete("/:pickup_id/:user_id", deletePickupParticipant);

export default router;
