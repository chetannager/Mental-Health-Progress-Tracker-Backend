import { connectDB, closeDB } from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

const createLog = async (userId, email, payload) => {
  const {
    date,
    mood,
    anxiety,
    sleepHours,
    sleepQuality,
    sleepDisturbances,
    activityType,
    activityDuration,
    socialInteractions,
    stressLevel,
    depressionSymptoms,
  } = payload;

  const db = await connectDB();
  try {
    const user = await db("users").where("email", email).first();

    if (user) {
      const currentDate = new Date().toISOString().split("T")[0];

      const existingLog = await db("logs")
        .where({ user_id: userId, date: currentDate })
        .first();

      if (existingLog) {
        return {
          statusCode: 200,
          message: "Log already exists for today.",
          date: currentDate,
          success: false,
          isTodayLogAdded: true,
        };
      }

      const [logId] = await db("logs").insert({
        log_id: uuidv4(),
        user_id: userId,
        date: new Date(),
        mood_rating: mood,
        anxiety_level: anxiety,
        sleep_hours: parseFloat(sleepHours),
        sleep_quality: sleepQuality,
        sleep_disturbances: sleepDisturbances,
        physical_activity_type: activityType,
        physical_activity_duration: parseInt(activityDuration),
        social_interactions: socialInteractions,
        stress_level: stressLevel,
        depression_symptoms: depressionSymptoms,
      });

      return {
        statusCode: 200,
        message: "Log added successfully",
        log: [logId],
        success: true,
        userId,
        date,
      };
    } else {
      return { statusCode: 400, error: "User not found" };
    }
  } catch (error) {
    console.error("Error insert log:", error);
    throw error;
  } finally {
    await closeDB();
  }
};

const checkLogIsAddedOrNot = async (userId) => {
  const db = await connectDB();
  try {
    const currentDate = new Date().toISOString().split("T")[0];

    const existingLog = await db("logs")
      .where({ user_id: userId, date: currentDate })
      .first();

    if (existingLog) {
      return {
        statusCode: 200,
        message: "Log already exists for today.",
        date: currentDate,
        success: true,
        isTodayLogAdded: true,
      };
    } else {
      return {
        statusCode: 200,
        message: "Log not added for today.",
        date: currentDate,
        success: true,
        isTodayLogAdded: false,
      };
    }
  } catch (error) {
    console.error("Error finding log:", error);
    throw error;
  } finally {
    await closeDB(db);
  }
};

export { createLog, checkLogIsAddedOrNot };
