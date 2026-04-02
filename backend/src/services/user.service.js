import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
