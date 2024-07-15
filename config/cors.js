import { config } from "dotenv";
config();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173/",
  optionsSuccessStatus: 200,
  maxAge: process.env.CORS_MAX_AGE || 86400,
};

export default corsOptions;
