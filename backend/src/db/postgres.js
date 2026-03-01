import pg from 'pg';
import { config } from '../config.js';

const { Pool } = pg;

const pool = new Pool({
  host: config.postgres.host,
  port: config.postgres.port,
  database: config.postgres.database,
  user: config.postgres.user,
});

pool.on('error', (err) => {
  console.error(' Unexpected error on idle client', err);
});

export const connectPostgres = async () => {
  try {
    const client = await pool.connect();
    console.log(' PostgreSQL connected');
    client.release();
  } catch (err) {
    console.error(' PostgreSQL connection failed:', err.message);
    process.exit(1);
  }
};

/**
 * @param {string} query - SQL query to execute
 * @returns {Promise<Array>} Query results
 */
export const executePostgresQuery = async (query) => {
  const client = await pool.connect();
  try {
    const result = await client.query(query);
    return result;
  } finally {
    client.release();
  }
};

export default pool;
