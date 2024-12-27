import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getThreadList = async () => {
  const res = await axiosInstance.get(API_ROUTES.Thread.getThreadList);
  return res.data;
};
