import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getMyBot = async () => {
  const res = await axiosInstance.get(API_ROUTES.Bot.getMyBots);
  return res.data;
};
