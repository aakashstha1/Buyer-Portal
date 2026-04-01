import { registerUser, loginUser } from "../services/auth.service.js";

// ------------------------------------------- Register -------------------------------------------
export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ------------------------------------------- Login -------------------------------------------
export const login = async (req, res) => {
  try {
    const token = await loginUser(req.body);
    // Set HttpOnly cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ------------------------------------------- Logout -------------------------------------------
export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.json({ message: "Logged out successfully" });
};
