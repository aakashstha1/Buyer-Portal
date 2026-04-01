// favourite.controller.js
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favourite.service.js";

// ----------------------------------------------- List Favourites -----------------------------------------------
export const listFavourites = async (req, res) => {
  try {
    const favourites = await getFavourites(req.user._id);
    res.json(favourites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ----------------------------------------------- Add to Favourites -----------------------------------------------
export const addToFavourite = async (req, res) => {
  try {
    const fav = await addFavourite(req.user._id, req.body.propertyId);
    res.status(201).json(fav);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ----------------------------------------------- Remove from Favourites -----------------------------------------------
export const removeFromFavourite = async (req, res) => {
  try {
    await removeFavourite(req.user._id, req.params.propertyId);
    res.json({ message: "Removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
