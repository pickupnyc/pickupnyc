// routes/pickupRoutes.js
import express from 'express';
import { createPickupGame, updatePickupGame, getPickupGames, getPickupGame, deletePickupGame } from '../controllers/pickupController.js';

const router = express.Router();

// Define routes
router.post('/create', createPickupGame);

router.get('/', getPickupGames);

router.get('/:id', getPickupGame);

router.patch('/:id', updatePickupGame);

router.delete('/:id', deletePickupGame);

export default router;
