import api from "./api";

// ------------------------------------------------------- Get Favourites Lists -------------------------------------------------------
export const getFavourites = async (page = 1, limit = 5) => {
  const { data } = await api.get(`/favourites?page=${page}&limit=${limit}`);
  return data;
};

// ------------------------------------------------------- Add from Favourites -------------------------------------------------------

export const addToFavourites = async (propertyId) => {
  const { data } = await api.post("/favourites", { propertyId });
  return data;
};

// ------------------------------------------------------- Remove from Favourites -------------------------------------------------------
export const removeFromFavourites = async (propertyId) => {
  const { data } = await api.delete(`/favourites/${propertyId}`);
  return data;
};

export const getFavouriteIds = async () => {
  const { data } = await api.get("/favourites/ids");
  return data.ids;
};
