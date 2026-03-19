import mysql from "mysql2/promise";
import path from "path";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env"),
override: true});

export async function connect() {
    // console.log({
    //     DB_HOST: process.env.DB_HOST,
    //     DB_USER: process.env.DB_USER,
    //     DB_PASSWORD: process.env.DB_PASS,
    //     DB_NAME: process.env.DB_NAME,
    //     DB_PORT: process.env.DB_PORT,
    // });

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
    });

}