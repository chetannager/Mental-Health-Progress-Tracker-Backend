import { Router } from "express";
import { createLog, checkLogIsAddedOrNot } from "../models/logModel.js";
const router = Router();

router.post("/v1/log", async (req, res) => {
  const result = await createLog(req.user.user_id, req.user.email, req.body);
  res.status(result.statusCode).json(result);
});

router.get("/v1/log", async (req, res) => {
  const result = await checkLogIsAddedOrNot(req.user.user_id);
  res.status(result.statusCode).json(result);
});

export default router;
