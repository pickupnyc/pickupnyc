// controllers/pickupController.js
import { pool } from '../config/database.js';

export const createPickupGame = async (req, res) => {
    try {
        const { title, borough, date, time, location, host, rules, capacity, premium } = req.body;
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

export const updatePickupGame = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, borough, date, time, location, host, rules, capacity, premium } = req.body;

        const result = await pool.query(
            `UPDATE pickups
             SET title = $1, borough = $2, date = $3, time = $4, location = $5, host = $6, rules = $7, capacity = $8, premium = $9
             WHERE id = $10
             RETURNING *`,
            [title, borough, date, time, location, host, rules, capacity, premium, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pickup game not found' });
        }

        res.status(200).json({
            message: 'Pickup game updated successfully',
            pickupGame: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating pickup game:', error);
        res.status(500).json({ message: 'Error updating pickup game' });
    }
}

export const deletePickupGame = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `DELETE FROM pickups
             WHERE id = $1
             RETURNING *`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pickup game not found' });
        }

        res.status(200).json({
            message: 'Pickup game deleted successfully',
            pickupGame: result.rows[0]
        });
    } catch (error) {
        console.error('Error deleting pickup game:', error);
        res.status(500).json({ message: 'Error deleting pickup game' });
    }
}

export const getPickupGames = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM pickups');

        res.status(200).json({
            message: 'Pickup games retrieved successfully',
            pickupGames: result.rows
        });
    } catch (error) {
        console.error('Error retrieving pickup games:', error);
        res.status(500).json({ message: 'Error retrieving pickup games' });
    }
}

export const getPickupGame = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `SELECT * FROM pickups
             WHERE id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Pickup game not found' });
        }

        res.status(200).json({
            message: 'Pickup game retrieved successfully',
            pickupGame: result.rows[0]
        });
    } catch (error) {
        console.error('Error retrieving pickup game:', error);
        res.status(500).json({ message: 'Error retrieving pickup game' });
    }
}