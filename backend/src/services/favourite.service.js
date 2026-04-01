// favourite.service.js
import Favourite from "../models/favourite.model.js";
import Property from "../models/property.model.js";

// ----------------------------------------------- List Favourites -----------------------------------------------
export const getFavourites = async (userId) => Favourite.find({ user: userId });

// ----------------------------------------------- Add to Favourites -----------------------------------------------
export const addFavourite = async (userId, propertyId) => {
  try {
    const property = await Property.findById(propertyId);
    if (!property) throw new Error("Property not found");
    const existing = await Favourite.findOne({
      user: userId,
      property: propertyId,
    });
    if (existing) throw new Error("Already in favourites");
    return await Favourite.create({ user: userId, property: propertyId });
  } catch (err) {
    if (err.code === 11000) throw new Error("Already in favourites");
    throw err;
  }
};
// ----------------------------------------------- Remove from Favourites -----------------------------------------------
export const removeFavourite = async (userId, propertyId) =>
  Favourite.findOneAndDelete({ user: userId, property: propertyId });
