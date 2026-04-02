// favourite.controller.js
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../services/favourite.service.js";

// ----------------------------------------------- List Favourites -----------------------------------------------
export const listFavourites = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const favourites = await getFavourites(req.user._id, page, limit);
    if (!favourites || !favourites.data.length) {
      return res.status(200).json({ message: "No favourites found", data: [] });
    }

    res.status(200).json(favourites);
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------- Add to Favourites -----------------------------------------------
export const addToFavourite = async (req, res, next) => {
  try {
    const fav = await addFavourite(req.user._id, req.body.propertyId);
    res.status(201).json(fav);
  } catch (err) {
    next(err);
  }
};

// ----------------------------------------------- Remove from Favourites -----------------------------------------------
export const removeFromFavourite = async (req, res, next) => {
  try {
    await removeFavourite(req.user._id, req.params.propertyId);
    res.json({ message: "Removed" });
  } catch (err) {
    next(err);
  }
};
