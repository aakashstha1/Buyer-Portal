import { getAllProperties } from "../services/property.service.js";

export const listProperties = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const properties = await getAllProperties(page, limit);
    res.json(properties);
  } catch (err) {
    next(err);
  }
};
