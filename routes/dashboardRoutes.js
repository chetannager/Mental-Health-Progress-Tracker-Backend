import { Router } from "express";
import { dashboardLogsInfo } from "../models/dashboardModel.js";
const router = Router();

router.get("/v1/logs", async (req, res) => {
  const result = await dashboardLogsInfo(req.user.user_id);
  res.status(result.statusCode).json(result);
});

export default router;
