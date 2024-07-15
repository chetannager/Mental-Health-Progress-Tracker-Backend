import { checkLogIsAddedOrNot, createLog } from "../models/logModel.js";
import { findUserByEmail } from "../models/authModel.js";

const addLog = async (currentUser, payload) => {
  const { user_id, email } = currentUser;

  try {
    const log = await createLog(user_id, email, payload);
    return log;
  } catch (error) {
    console.error("Authentication error:", error);
    return { statusCode: 500, error: "Database error" };
  }
};

const checkLog = async (currentUser) => {
  const { user_id, email } = currentUser;

  try {
    let log = await checkLogIsAddedOrNot(user_id);

    return log;
  } catch (error) {
    console.error("Authentication error:", error);
    return { statusCode: 500, error: "Database error" };
  }
};

export { addLog, checkLog };
