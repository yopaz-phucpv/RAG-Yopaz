import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getBotDetail = async () => {
  const res = await axiosInstance.get(API_ROUTES.Bot.getBotDetail);
  return res.data;
};
