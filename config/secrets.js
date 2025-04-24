import dotenv from "dotenv";
dotenv.config();

const secrets = {
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,

  MONGO_DB_URI: process.env.monogoDb_URI,

  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,

  NODE_ENV: process.env.NODE_ENV,
};

export default secrets;
