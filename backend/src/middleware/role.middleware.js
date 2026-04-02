import AppError from "../utils/AppError.js";

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new AppError("Unauthorized: no user information", 401);
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError("Forbidden: insufficient permissions", 403);
    }

    next();
  };
};
