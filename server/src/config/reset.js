import { pool } from "./database.js";

const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            google_id VARCHAR(50) NOT NULL,
            username varchar(100) NOT NULL,
            email varchar(255) NOT NULL,
            img varchar(500) NOT NULL
        );
    `;

    try {
        await pool.query(createUsersTableQuery);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", err);
    }
};

async function deleteUsersTable() {
    const deleteUsersTableQuery = `
        DROP TABLE IF EXISTS users;
    `;

    try {
        await pool.query(deleteUsersTableQuery);
        console.log("Users table deleted successfully");
    } catch (error) {
        console.error("Error deleting users table:", error);
    }
}

await createUsersTable();
// await deleteUsersTable();
