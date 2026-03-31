// favourite.controller.js
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favourite.service.js";

export const listFavourites = async (req, res) => {
  const favourites = await getFavourites(req.user._id);
  res.json(favourites);
};

export const addToFavourite = async (req, res) => {
  const fav = await addFavourite(req.user._id, req.body.propertyId);
  res.json(fav);
};

export const removeFromFavourite = async (req, res) => {
  await removeFavourite(req.user._id, req.params.propertyId);
  res.json({ message: "Removed" });
};
