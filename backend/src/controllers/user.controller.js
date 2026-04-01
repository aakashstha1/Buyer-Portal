import { getUserProfile } from "../services/user.service.js";
export const getMe = async (req, res) => {
  try {
    const user = await getUserProfile(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
