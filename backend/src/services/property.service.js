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
