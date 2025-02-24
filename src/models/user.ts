import pool from "../../config/db";

export interface User {
    id?: number;
    username: string;
    password: string;
    created_at?: Date;
}


// Find a user by username
export async function findUserByUsername(username: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
}

// Create a new user
export async function createUser(username: string, password: string): Promise<void> {
    await pool.query('INSERT INTO users (username, password) VALUES (?, ?', [username, password]);
}