import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    throw new AppError("No token provided", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      throw new AppError("User not found", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    throw new AppError("Invalid token", 401);
  }
};
