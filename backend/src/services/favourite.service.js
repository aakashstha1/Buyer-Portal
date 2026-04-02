import Favourite from "../models/favourite.model.js";
import Property from "../models/property.model.js";
import AppError from "../utils/AppError.js";

// ----------------------------------------------- List Favourites -----------------------------------------------
export const getFavourites = async (userId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  const [favourites, total] = await Promise.all([
    Favourite.find({ user: userId })
      .populate("property")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),

    Favourite.countDocuments({ user: userId }),
  ]);
  return {
    data: favourites,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// ----------------------------------------------- Add to Favourites -----------------------------------------------
export const addFavourite = async (userId, propertyId) => {
  const property = await Property.findById(propertyId);
  if (!property) throw new AppError("Property not found", 404);

  const existing = await Favourite.findOne({
    user: userId,
    property: propertyId,
  });
  if (existing) throw new AppError("Already in favourites", 400);

  return Favourite.create({ user: userId, property: propertyId });
};

// ----------------------------------------------- Remove from Favourites -----------------------------------------------
export const removeFavourite = async (userId, propertyId) => {
  const favourite = await Favourite.findOneAndDelete({
    user: userId,
    property: propertyId,
  });
  if (!favourite) throw new AppError("Favourite not found", 404);
  return favourite;
};

export const getFavouriteIdService = async (userId) => {
  const favourites = await Favourite.find({ user: userId }).select("property");
  return favourites.map((f) => f.property.toString());
};