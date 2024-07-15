import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import admin from "firebase-admin";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import corsOptions from "./config/cors.js";
import appconfig from "./config/appconfig.js";
import serviceAccount from "./config/firebase.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mental-health-progress-tracker.firebaseio.com",
});

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(authMiddleware);

app.use(dashboardRoutes);
app.use(authRoutes);
app.use(logRoutes);

app.listen(appconfig.app.port, () => {
  console.log(`Server is running on port ${appconfig.app.port}`);
});
