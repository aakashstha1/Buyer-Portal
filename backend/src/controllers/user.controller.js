import { getUserProfile } from "../services/user.service.js";
export const getMe = async (req, res, next) => {
  try {
    const user = await getUserProfile(req.user._id);
    res.json(user);
  } catch (err) {
    next(err);
  }
};
