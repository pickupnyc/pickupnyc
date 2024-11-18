// controllers/pickupController.js
import { pool } from '../config/database.js';

export const createPickupGame = async (req, res) => {
    try {
        const { title, borough, date, time, location, host, rules, capacity, premium } = req.body;

        // Ensure that the location is provided as an array or string that can be converted to a PostgreSQL point

        const formattedTime = time + ':00'; 

        const result = await pool.query(
            `INSERT INTO pickups (title, borough, date, time, location, host, rules, capacity, premium)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [title, borough, date, formattedTime, location, host, rules, capacity, premium]
        );

        try{
            await pool.query(
            `INSERT INTO pickup_participants (pickup_id, user_id)
             VALUES ($1, $2)`,
            [result.rows[0].id, host]
        )}
        catch (error){
            console.error("Error adding host to pickup participants table:", error);
        }

        res.status(201).json({
            message: 'Pickup game created successfully',
            pickupGame: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating pickup game:', error);
        res.status(500).json({ message: 'Error creating pickup game' });
    }
};

export const getPickupGames = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pickups');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching pickup games:', error);
        res.status(500).json({ message: 'Error fetching pickup games' });
    }
};