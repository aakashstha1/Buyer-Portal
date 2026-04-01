import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

// --------------------------------------------------- Register User -------------------------------------------
export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });
  const { password: pwd, ...userData } = user._doc;
  return { user: userData };
};

// --------------------------------------------------- Login User -------------------------------------------
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const match = await bcryptjs.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });
  return token;
};
