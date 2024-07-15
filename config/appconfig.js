import { config } from "dotenv";
config();

const appconfig = {
  app: {
    port: process.env.DEV_APP_PORT || 2000,
    appName: process.env.APP_NAME || "Mental Health Progress Tracker",
    env: process.env.NODE_ENV || "development",
  },
  db: {
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "mentalhealthprogresstracker",
    host: process.env.DB_HOST || "mongodb://localhost:27017",
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    logging: true,
  },
};

export default appconfig;
