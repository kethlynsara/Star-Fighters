import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL
};

const db = new Pool(databaseConfig);

export default db;