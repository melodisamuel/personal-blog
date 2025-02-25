import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load env variables

// Create a MYSQL connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "prismasql",
    database: "personal_blog",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default pool;