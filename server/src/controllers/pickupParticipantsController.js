import { pool } from "../config/database.js";

export const createPickupParticipant = async (req, res) => {
    const { pickup_id, user_id } = req.body;

    if (!pickup_id || !user_id) {
        return res
            .status(400)
            .json({ error: "pickup_id and user_id are required." });
    }

    try {
        const result = await pool.query(
            `INSERT INTO pickup_participants (pickup_id, user_id) VALUES ($1, $2) RETURNING *`,
            [pickup_id, user_id],
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Error creating pickup participant:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const getAllPickupParticipants = async (req, res) => {
    const { pickup_id } = req.params;

    if (!pickup_id) {
        return res.status(400).json({ error: "pickup_id is required." });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM pickup_participants WHERE pickup_id = $1`,
            [pickup_id],
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching pickup participants:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const deletePickupParticipant = async (req, res) => {
    const { pickup_id, user_id } = req.params;

    if (!pickup_id || !user_id) {
        return res
            .status(400)
            .json({ error: "pickup_id and user_id are required." });
    }

    try {
        const result = await pool.query(
            `DELETE FROM pickup_participants WHERE pickup_id = $1 AND user_id = $2 
             RETURNING *`,
            [pickup_id, user_id],
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Participant not found." });
        }

        res.status(200).json({
            message: "Participant deleted successfully.",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("Error deleting pickup participant:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const isUserRegistered = async (req, res) => {
    const { pickup_id, user_id } = req.params;

    if (!pickup_id || !user_id) {
        return res
            .status(400)
            .json({ error: "pickup_id and user_id are required." });
    }

    try {
        const result = await pool.query(
            `SELECT * FROM pickup_participants WHERE pickup_id = $1 AND user_id = $2`,
            [pickup_id, user_id],
        );

        if (result.rowCount > 0) {
            return res.status(200).json({ registered: true });
        } else {
            return res.status(200).json({ registered: false });
        }
    } catch (error) {
        console.error("Error checking if user is registered:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};
