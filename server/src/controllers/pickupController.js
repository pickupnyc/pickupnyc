// controllers/pickupController.js
import { pool } from '../config/database.js';

export const createPickupGame = async (req, res) => {
    try {
        const { title, borough, date, time, location, host, rules, capacity, premium } = req.body;

        // Ensure that the location is provided as an array or string that can be converted to a PostgreSQL point
        const locationPoint = `(${location.lat}, ${location.lng})`; // Assuming location has `lat` and `lng` properties

        const result = await pool.query(
            `INSERT INTO pickups (title, borough, date, time, location, host, rules, capacity, premium)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [title, borough, date, time, locationPoint, host, rules, capacity, premium]
        );

        res.status(201).json({
            message: 'Pickup game created successfully',
            pickupGame: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating pickup game:', error);
        res.status(500).json({ message: 'Error creating pickup game' });
    }
};