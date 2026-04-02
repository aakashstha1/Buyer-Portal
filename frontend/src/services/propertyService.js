import api from "./api";

// ------------------------------------------------------- Get Properties Lists -------------------------------------------------------
export const getProperties = async (page = 1, limit = 5) => {
  const { data } = await api.get(`/properties?page=${page}&limit=${limit}`);
  return data;
};
