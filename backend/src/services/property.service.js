import Property from "../models/property.model.js";

export const getAllProperties = async (page = 1, limit = 5) => {
  const skip = (page - 1) * limit;
  const [properties, total] = await Promise.all([
    Property.find().skip(skip).limit(limit).sort({ createdAt: -1 }),
    Property.countDocuments(),
  ]);

  return {
    data: properties,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getSearchedProperty = async ({ keyword, page = 1, limit = 5 }) => {
  if (!keyword)
    return {
      data: [],
      pagination: { total: 0, page: 1, limit, totalPages: 1 },
    };

  const skip = (page - 1) * limit;
  const query = {
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { location: { $regex: keyword, $options: "i" } },
    ],
  };

  const [properties, total] = await Promise.all([
    Property.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Property.countDocuments(query),
  ]);

  return {
    data: properties,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};
