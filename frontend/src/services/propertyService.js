import api from "./api";

// ------------------------------------------------------- Get Properties Lists -------------------------------------------------------
export const getProperties = async (page = 1, limit = 5) => {
  const { data } = await api.get(`/properties?page=${page}&limit=${limit}`);
  return data;
};

export const getSearchedProperties = async (keyword, page = 1, limit = 5) => {
  const { data } = await api.get(
    `/properties/search?keyword=${keyword}&page=${page}&limit=${limit}`,
  );
  return data; // returns { data, pagination }
};
