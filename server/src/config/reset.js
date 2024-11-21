import { pool } from "./database.js";

const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id serial PRIMARY KEY,
            google_id VARCHAR(50) NULL,
            username varchar(100) NOT NULL,
            email varchar(255) NOT NULL UNIQUE,
            password varchar(255) NULL,
            img varchar(500) NULL
        );
    `;

    try {
        await pool.query(createUsersTableQuery);
        console.log("Users table created successfully");
    } catch (error) {
        console.error("Error creating users table:", error);
    }
};

const createPostsTable = async () => {
    const createPostsTableQuery = `
        CREATE TABLE posts (
            id serial PRIMARY KEY,
            body text NULL,
            creator_id integer NOT NULL,
            likes integer DEFAULT 0,
            is_reply boolean DEFAULT FALSE,
            parent_post_id integer,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (parent_post_id) REFERENCES posts(id) ON DELETE CASCADE,
            CONSTRAINT parent_post_check CHECK (
                (is_reply = FALSE AND parent_post_id IS NULL) OR
                (is_reply = TRUE AND parent_post_id IS NOT NULL)
            )
        );
    `;

    try {
        await pool.query(createPostsTableQuery);
        console.log("Created posts table successfully");
    } catch(error){
        console.error("Error creating posts table:", error)
    }
}

const createPickupsTable = async () => {
    const createPickupsTableQuery = `
        CREATE TABLE IF NOT EXISTS pickups (
            id serial PRIMARY KEY,
            title varchar(255) NOT NULL,
            borough varchar(100) NOT NULL,
            date timestamp NOT NULL,
            time timestamp NOT NULL,
            location point NOT NULL,
            host integer NOT NULL,
            rules text NULL,
            capacity integer NOT NULL,
            count integer DEFAULT 0,
            premium boolean DEFAULT false,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (host) REFERENCES users(id) ON DELETE CASCADE
        );
    `;

    try {
        await pool.query(createPickupsTableQuery);
        console.log("Pickup table created successfully");
    } catch(error) {
        console.error("Error creating pickup table:", error);
    }
}

const createPickupParticipantsTable = async () => {
    const createPickupParticipantsTableQuery = `
        CREATE TABLE IF NOT EXISTS pickup_participants (
            id serial PRIMARY KEY,
            pickup_id integer NOT NULL,
            user_id integer NOT NULL,
            status varchar(50) DEFAULT 'registered',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pickup_id) REFERENCES pickups(id) ON DELETE CASCADE,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            UNIQUE(pickup_id, user_id)
        );
    `;

    try {
        await pool.query(createPickupParticipantsTableQuery);
        console.log("Created pickup participants table successfully");
    } catch(error) {
        console.error("Error creating pickup participants table", error);
    }
}

async function deletePostsTable() {
    const deletePostsTableQuery = `
        DROP TABLE IF EXISTS posts;
    `;

    try {
        await pool.query(deletePostsTableQuery);
        console.log("Posts table deleted successfully");
    } catch (error) {
        console.error("Error deleting posts table:", error);
    }
}

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

async function alterPickupsTable() {
    const alterPickupsTableQuery = `
    ALTER TABLE pickups
    ALTER COLUMN location TYPE text USING location::text;
    `;
    try {
        await pool.query(alterPickupsTableQuery);
        console.log("Pickups table altered successfully");
    } catch(error) {
        console.error("Error altering pickups table:", error);
    };
}

async function resetDatabase() {
    const truncateUsersTableQuery = `TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;

    try {
        await pool.query(truncateUsersTableQuery);
        console.log("Database reset successfully");
    } catch (err) {
        console.error("Error resetting database", err);
    }
}


// await alterPickupsTable();
// await deletePostsTable();
// await createUsersTable();
// await createPostsTable();
// await createPickupsTable();
// await createPickupParticipantsTable();
// await deleteUsersTable();
