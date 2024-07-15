import { findUserByEmail, createUser } from "../models/authModel.js";

const authentication = async (currentUser) => {
  const { email } = currentUser;

  try {
    let user = await findUserByEmail(email);

    if (user) {
      return {
        statusCode: 200,
        message: "Authenticated",
        user,
        isAuthenticated: true,
      };
    } else {
      const newUser = await createUser(currentUser);
      return {
        statusCode: 201,
        message: "User created and authenticated",
        user: newUser,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return { statusCode: 500, error: "Database error" };
  }
};

export { authentication };
