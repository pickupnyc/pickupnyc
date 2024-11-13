// routes/pickupRoutes.js
import express from 'express';
import { createPickupGame } from '../controllers/pickupController.js';

const router = express.Router();

// Define routes
router.post('/create', createPickupGame);

export default router;
