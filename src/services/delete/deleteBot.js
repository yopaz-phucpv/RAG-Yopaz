import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const deleteBot = async (id) => {
  const res = await axiosInstance.delete(
    API_ROUTES.Bot.deleteBot.replace(":id", id.toString())
  );
  return res.data;
};
