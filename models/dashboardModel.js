import { connectDB, closeDB } from "../config/db.js";

const activityTypes = [
  "Running",
  "Walking",
  "Cycling",
  "Gym",
  "Yoga",
  "Others",
];

const dashboardLogsInfo = async (userId) => {
  const db = await connectDB();
  try {
    const logs = await db("logs")
      .where("user_id", userId)
      .orderBy("date", "desc");

    const mood_rating = await db("logs")
      .where("user_id", userId)
      .avg("mood_rating as average_rating")
      .whereBetween("mood_rating", [0, 4])
      .first();

    const sleep_hours = await db("logs")
      .where("user_id", userId)
      .avg("sleep_hours as average_sleep_hours")
      .first();

    const anxiety_level = await db("logs")
      .where("user_id", userId)
      .avg("anxiety_level as average_anxiety_level")
      .first();

    // Query to count occurrences of each activity_type
    const activityCounts = await db("logs")
      .where("user_id", userId)
      .select("physical_activity_type")
      .count("* as count")
      .groupBy("physical_activity_type");

    const totalCount = activityCounts.reduce(
      (total, activity) => total + activity.count,
      0
    );

    const activityPercentages = activityTypes.map((activityType) => {
      const activity = activityCounts.find(
        (item) => item.physical_activity_type === activityType
      );
      const count = activity ? activity.count : 0;
      const percentage = ((count / totalCount) * 100).toFixed(2);
      return { activity_type: activityType, percentage };
    });

    const currentDate = new Date().toISOString().split("T")[0];

    const existingLog = await db("logs")
      .where({ user_id: userId, date: currentDate })
      .first();

    if (existingLog) {
      return {
        statusCode: 200,
        date: currentDate,
        success: true,
        isTodayLogAdded: true,
        logs,
        totalLogsAdded: logs.length,
        mood_rating: mood_rating.average_rating || 0,
        sleep_hours: sleep_hours.average_sleep_hours || 0,
        anxiety_level: anxiety_level.average_anxiety_level || 0,
        activityPercentages,
      };
    } else {
      return {
        statusCode: 200,
        date: currentDate,
        success: true,
        isTodayLogAdded: false,
        logs,
        totalLogsAdded: logs.length,
        mood_rating: mood_rating.average_rating || 0,
        sleep_hours: sleep_hours.average_sleep_hours || 0,
        anxiety_level: anxiety_level.average_anxiety_level || 0,
        activityPercentages,
      };
    }
  } catch (error) {
    console.error("Error finding log:", error);
    throw error;
  } finally {
    await closeDB(db);
  }
};

export { dashboardLogsInfo };
