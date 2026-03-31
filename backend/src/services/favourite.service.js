// favourite.service.js
import Favourite from "../models/favourite.model.js";

export const getFavourites = async (userId) => Favourite.find({ user: userId });

export const addFavourite = async (userId, propertyId) => {
  const exists = await Favourite.findOne({ user: userId, propertyId });
  if (exists) throw new Error("Already in favourites");
  return Favourite.create({ user: userId, propertyId });
};

export const removeFavourite = async (userId, propertyId) =>
  Favourite.deleteOne({ user: userId, propertyId });
