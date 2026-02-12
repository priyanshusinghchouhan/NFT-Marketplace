import { api } from "./client";

export const getListings = async () => {
  const { data } = await api.get("/marketplace/listings");
  return data;
};
