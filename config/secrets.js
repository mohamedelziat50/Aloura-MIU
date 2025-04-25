// secrets.js
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const DOMAIN = process.env.DOMAIN;

export const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;

export const NODE_ENV = process.env.NODE_ENV;
