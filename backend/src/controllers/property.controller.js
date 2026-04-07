import { getAllProperties, getSearchedProperty } from "../services/property.service.js";

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


export const searchProperty = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const result = await getSearchedProperty({ ...req.query, page, limit });
    res.status(200).json(result); // now returns { data, pagination }
  } catch (error) {
    next(error);
  }
};
