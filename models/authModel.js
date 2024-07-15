import { connectDB, closeDB } from "../config/db.js";

const findUserByEmail = async (email) => {
  const db = await connectDB();
  try {
    const user = await db("users").where("email", email).first();
    return user || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  } finally {
    await closeDB(db);
  }
};

const createUser = async (currentUser) => {
  const db = await connectDB();
  try {
    const { user_id, name, email, picture } = currentUser;
    const [id] = await db("users").insert({
      user_id,
      name,
      email,
      picture,
    });
    return { id, email };
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await closeDB(db);
  }
};

export { findUserByEmail, createUser };
