import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getUserHistory = async (id) => {
  const res = await axiosInstance.get(
    API_ROUTES.Thread.getUserHistory.replace(":id", id.toString())
  );
  return res.data;
};
