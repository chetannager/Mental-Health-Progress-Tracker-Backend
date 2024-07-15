import admin from "firebase-admin";

const authMiddleware = async (req, res, next) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  if (idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
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
};

export { authMiddleware };
