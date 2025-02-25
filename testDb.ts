import pool from './config/db';

async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Mysql Database Connected Successsfully!');
        connection.release();        
    } catch (error) {
        console.log('MYSQL Connectiomn Failed:', error);
        
    }
}

testConnection();