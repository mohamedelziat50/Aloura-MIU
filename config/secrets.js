// secrets.js
import dotenv from "dotenv";
import { TrustProductsChannelEndpointAssignmentInstance } from "twilio/lib/rest/trusthub/v1/trustProducts/trustProductsChannelEndpointAssignment";
dotenv.config();

export const PORT = process.env.PORT;
export const DOMAIN = process.env.DOMAIN;

export const MONGO_DB_URI = process.env.MONGO_DB_URI;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRY = process.env.JWT_EXPIRY;

export const NODE_ENV = process.env.NODE_ENV;
export const GENAI = process.env.genAI;

export const APIKEY = process.env.apiKey;
export const APISECRET = process.env.apiSecret;

export const ACCOUNTSID = process.env.accountSid;
export const AUTHTOKEN = process.env.authToken;
export const FRONUMBER = process.env.fromNumber;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
