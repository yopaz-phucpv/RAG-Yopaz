import axiosInstance from "../axiosInstance";
import { API_ROUTES } from "../common/routes";

export const getUserInfo = async () => {
  const res = await axiosInstance.get(API_ROUTES.UserInfo);
  return res.data;
};
