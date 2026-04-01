import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import { generateToken } from "../utils/generateToken.js";
import { capitalizeWords } from "../utils/capitalizeWords.js";

dotenv.config({ quiet: true });

// --------------------------------------------------- Register User -------------------------------------------
export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already exists");
  const hashedPassword = await bcryptjs.hash(password, 10);
  const capitalizedName = capitalizeWords(name);
  const user = await User.create({
    name: capitalizedName,
    email,
    password: hashedPassword,
  });
  const { password: pwd, ...userData } = user._doc;
  return { user: userData };
};

// --------------------------------------------------- Login User -------------------------------------------
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const match = await bcryptjs.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user);
  return token;
};
