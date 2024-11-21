import { pool } from "../config/database.js";

export const createPickupParticipant = async (req, res) => {
    const { pickup_id, user_id } = req.body;

    if (!pickup_id || !user_id) {
        return res
            .status(400)
            .json({ error: "pickup_id and user_id are required." });
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const participantResult = await client.query(
            `INSERT INTO pickup_participants (pickup_id, user_id) VALUES ($1, $2) RETURNING *`,
            [pickup_id, user_id],
        );

        await client.query(
            `UPDATE pickups SET count = count + 1 WHERE id = $1`,
            [pickup_id],
        );

        await client.query("COMMIT");

        res.status(201).json(participantResult.rows[0]);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error creating pickup participant:", error);
        res.status(500).json({ error: "Internal server error." });
    } finally {
        client.release();
    }
};

export const getPickupDetails = async (req, res) => {
    const { pickup_id } = req.params;

    if (!pickup_id) {
        return res.status(400).json({ error: "pickup_id is required." });
    }

    try {
        const query = `
            SELECT 
                p.id AS pickup_id,
                p.title,
                p.borough,
                p.date,
                p.time,
                p.location,
                p.rules,
                p.capacity,
                p.count,
                p.premium,
                u.id AS user_id,
                u.username,
                u.email,
                u.img AS user_img,
                pp.status AS participant_status
            FROM 
                pickups p
            LEFT JOIN 
                pickup_participants pp 
                ON p.id = pp.pickup_id
            LEFT JOIN 
                users u 
                ON pp.user_id = u.id
            WHERE 
                p.id = $1;
        `;

        const result = await pool.query(query, [pickup_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Pickup game not found." });
        }

        const pickupDetails = {
            pickup_id: result.rows[0].pickup_id,
            title: result.rows[0].title,
            borough: result.rows[0].borough,
            date: result.rows[0].date,
            time: result.rows[0].time,
            location: result.rows[0].location,
            rules: result.rows[0].rules,
            capacity: result.rows[0].capacity,
            count: result.rows[0].count,
            premium: result.rows[0].premium,
            participants: result.rows
                .map((row) => ({
                    user_id: row.user_id,
                    username: row.username,
                    status: row.participant_status,
                    joined_at: row.participation_created_at,
                }))
                .filter((participant) => participant.user_id),
        };

        res.status(200).json(pickupDetails);
    } catch (error) {
        console.error("Error fetching pickup details:", error);
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

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const result = await client.query(
            `DELETE FROM pickup_participants WHERE pickup_id = $1 AND user_id = $2 RETURNING *`,
            [pickup_id, user_id],
        );

        if (result.rowCount === 0) {
            await client.query("ROLLBACK");
            return res.status(404).json({ error: "Participant not found." });
        }

        await client.query(
            `UPDATE pickups SET count = GREATEST(count - 1, 0) WHERE id = $1`,
            [pickup_id],
        );

        await client.query("COMMIT");

        res.status(200).json({
            message: "Participant deleted successfully.",
            data: result.rows[0],
        });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error deleting pickup participant:", error);
        res.status(500).json({ error: "Internal server error." });
    } finally {
        client.release();
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
