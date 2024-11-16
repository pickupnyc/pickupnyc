// routes/pickupRoutes.js
import express from 'express';
import { createPickupGame, getPickupGames } from '../controllers/pickupController.js';

const router = express.Router();

// Define routes
router.post('/create', createPickupGame);
router.get('/', getPickupGames);

export default router;
