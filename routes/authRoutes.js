import { Router } from "express";
import { authentication } from "../controllers/authController.js";
import admin from "firebase-admin";
const router = Router();

router.post("/v1/auth/google", async (req, res) => {
  const result = await authentication(req.user);
  res.status(result.statusCode).json(result);
});

router.get("/v1/auth/verify", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      console.log(decodedToken);
      let user = decodedToken;
      res.status(200).json({
        statusCode: 200,
        message: "Authenticated",
        user,
        isAuthenticated: true,
      });
    } catch (error) {
      res.status(401).json({
        statusCode: 401,
        message: "Unauthorized",
      });
    }
  } else {
    res.status(401).json({
      statusCode: 401,
      message: "Unauthorized",
    });
  }
});

export default router;
